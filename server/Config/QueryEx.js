const sql = require("mssql");

const pools = {}; // key = server+database

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

async function executeQuery(config, query, params = {}) {
  console.log("🛠️ Using DB config:", config.database);
  const pool = await getPool(config);

  try {
    const request = pool.request();
    for (const key in params) {
      request.input(key, params[key]);
    }

    const result = await request.query(query);
    return result;
  } catch (err) {
    console.error("❌ Query error:", err);
    throw err;
  }
}

const cleanup = async () => {
  for (const key in pools) {
    console.log(`🧹 Closing pool: ${key}`);
    await pools[key].close();
  }
  process.exit(0);
};

process.on("exit", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

module.exports = {
  executeQuery,
};
