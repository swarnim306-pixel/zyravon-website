require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const {
  checkDatabaseConnection,
  closeDatabase
} = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : false
}));

app.use(express.json({ limit: "1mb" }));

// API welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ZYRAVON AI Platform API",
    status: "running"
  });
});

// Server and database health check
app.get("/health", async (req, res) => {
  const databaseConnected = await checkDatabaseConnection();

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    service: "ZYRAVON AI Platform",
    server: "operational",
    database: databaseConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`ZYRAVON API running on port ${PORT}`);
});

// Graceful shutdown
async function shutdown() {
  console.log("Shutting down ZYRAVON API...");

  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
