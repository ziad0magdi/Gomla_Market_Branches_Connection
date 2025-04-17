const sql = require("mssql");
require("dotenv").config();

const primaryConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "DEVADMIN07",
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
  },
};
const connectPrimary = async () => {
  // console.log("hello");
  return await sql.connect(primaryConfig);
};

module.exports = {
  primaryConfig,
};
