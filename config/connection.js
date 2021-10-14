const Sequalize = require('sequelize');

    require('dotenv').config();

const sequalize = process.env.JAWSDB_URL
    ? new Sequalize(proecess.env.JAWSDB_URL)
    : new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3006
    });

    module.exports = sequalize;