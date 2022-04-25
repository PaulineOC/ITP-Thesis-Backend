require('dotenv').config();
const fs = require('fs');
const {
    DB_DEV_USERNAME,
    DB_DEV_PASSWORD,
    DB__DEV_HOST,
    DB_DEV_PORT,
    DB_DEV_DATABASE_NAME,
    DB_PROD_USERNAME,
    DB_PROD_PASSWORD,
    DB_PROD_HOST,
    DB_PROD_PORT,
    DB_PROD_DATABASE_NAME,
    DB_CA_CERT
} = process.env;


module.exports = {
    "development": {
        username: DB_DEV_USERNAME,
        password: DB_DEV_PASSWORD,
        host: DB__DEV_HOST,
        port: DB_DEV_PORT,
        database: DB_DEV_DATABASE_NAME,
        dialect: "postgres",
        define: {
            underscored: true
        }
    },
    "production": {
        username: DB_PROD_USERNAME,
        password: DB_PROD_PASSWORD,
        host: DB_PROD_HOST,
        port: DB_PROD_PORT,
        database: DB_PROD_DATABASE_NAME,
        dialect: "postgres",
        dialectOptions: {
            ssl:{
            "require":true,
            "rejectUnauthorized": false,
            ca:
                process.env.NODE_ENV === 'production' ?
                    process.env.CA_CERT:
                    fs.readFileSync(__dirname + '/ca-cert.crt'),
            }
        },
        define: {
            underscored: true
        }
    }
};
