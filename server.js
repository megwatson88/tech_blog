const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001; 

const sequelize = require("./config/connection");
const SequalizeStore = require('connect-session-sequelize')(session.Store);


app.set('trust proxy', 1);

const sess = {
    secret: 'Top Secret ',
    cookie: {},
    resave: false,
    saveUninitialized: true, 
    store: new SequalizeStore({
        db: sequelize
    })
};

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/api/index'))

sequalize.sync({ force: false }).then(()=> {app.listen(PORT, () => console.log(`Now listening on ${PORT}`))})