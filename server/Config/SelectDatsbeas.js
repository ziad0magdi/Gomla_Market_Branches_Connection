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
      trustServerCertificate: true,
    },
  };
  return SelectDatsbeasConfig;
};

module.exports = {
  createConnection,
};
