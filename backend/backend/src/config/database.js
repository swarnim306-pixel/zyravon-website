const { Pool } = require("pg");

let pool = null;

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: true }
        : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });

    pool.on("error", (error) => {
      console.error("Unexpected database error:", error.message);
    });
  }

  return pool;
}

async function query(text, params = []) {
  return getDatabase().query(text, params);
}

async function checkDatabaseConnection() {
  try {
    await query("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
}

async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = {
  query,
  checkDatabaseConnection,
  closeDatabase
};
