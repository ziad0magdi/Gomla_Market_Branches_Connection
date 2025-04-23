const sql = require("mssql");
require("dotenv").config();

const primaryConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    requestTimeout: 3000000,
    connectionTimeout: 3000000,
  },
};
const connectPrimary = async () => {
  // console.log("hello");
  return await sql.connect(primaryConfig);
};

module.exports = {
  primaryConfig,
};
