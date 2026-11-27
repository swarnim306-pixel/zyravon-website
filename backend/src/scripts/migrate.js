require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
  query,
  closeDatabase
} = require("../config/database");

async function runMigration() {
  try {
    console.log("Starting ZYRAVON database migration...");

    const schemaPath = path.join(
      __dirname,
      "../../database/schema.sql"
    );

    const schema = fs.readFileSync(schemaPath, "utf8");

    await query(schema);

    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

runMigration();
