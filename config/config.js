require("dotenv").config();

module.exports = {
  development: {
    username: process.env(DB_DEV_USERNAME),
    password: process.env(DB_DEV_PASSWORD),
    database: process.env(DB_DEV_DBNAME),
    host: process.env(DB_DEV_HOST),
    dialect: "mysql",
  },
};
