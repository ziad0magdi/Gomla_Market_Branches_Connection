const sql = require("mssql");
require("dotenv").config();

const createConnection = async (
  user_password,
  user_name,
  database_server,
  dbName
) => {
  const SelectDatsbeasConfig = {
    user: user_name,
    password: user_password,
    server: database_server,
    database: dbName,
    options: {
      encrypt: false,
      trustServerCertificate: true,
      requestTimeout: 3000000,
      connectionTimeout: 3000000,
    },
  };
  return SelectDatsbeasConfig;
};

module.exports = {
  createConnection,
};
