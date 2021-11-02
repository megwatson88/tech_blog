const Sequelize = require('sequelize');

    require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(proecess.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        user: 'root',
        password: '',


    });

    module.exports = sequelize;