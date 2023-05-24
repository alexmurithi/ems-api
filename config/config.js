require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DBNAME,
    host: process.env.DB_DEV_HOST,
    dialect: "mysql",
  },
  testing: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DBNAME,
    host: process.env.DB_TEST_HOST,
    port:process.env.DB_TEST_PORT,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DBNAME,
    host: process.env.DB_PROD_HOST,
    port:process.env.DB_PROD_PORT,
    dialect: "mysql",
  },
};
