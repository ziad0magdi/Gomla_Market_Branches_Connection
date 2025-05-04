const sql = require("mssql");

async function validateUser(user_name, user_password, database_server, dbName) {
  try {
    const pool = await sql.connect({
      user: user_name,
      password: user_password,
      server: database_server,
      database: dbName,
      options: {
        trustServerCertificate: true,
      },
    });

    console.log("Login successful!");
    pool.close();
    return true;
  } catch (err) {
    console.log("Login failed:", err.message);
    return false;
  }
}

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

const pools = {};

function getPoolKey(config) {
  return `${config.server}_${config.database}`;
}
async function getPool(config) {
  const key = getPoolKey(config);
  console.log("key", key);
  if (!pools[key]) {
    try {
      const pool = await new sql.ConnectionPool(config).connect();
      pools[key] = pool;
      console.log(`✅ Connected to ${key}`);
    } catch (err) {
      console.error("❌ Error connecting to pool:", err);
      throw err;
    }
  }

  return pools[key];
}

module.exports = {
  validateUser,
  createConnection,
  getPool,
};
