// Application Insights MUST be initialized before any other require()
const appInsights = require("applicationinsights");
if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  appInsights
    .setup()
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setSendLiveMetrics(true)
    .start();
  console.log("Application Insights initialized");
} else {
  console.log(
    "APPLICATIONINSIGHTS_CONNECTION_STRING not set - skipping App Insights init",
  );
}

const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patients");
const recordRoutes = require("./routes/records");
const uploadRoutes = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("EHealth API running");
});

// Health check endpoint - verifies live DB + Blob connectivity (P4 deliverable)
app.get("/api/health", async (req, res) => {
  const status = {
    status: "ok",
    db: "unknown",
    blob: "unknown",
    timestamp: new Date().toISOString(),
  };
  let httpCode = 200;

  try {
    const { poolPromise } = require("./db");
    const dbPool = await poolPromise;
    await dbPool.request().query("SELECT 1 AS ok");
    status.db = "connected";
  } catch (err) {
    status.db = "error: " + err.message;
    status.status = "degraded";
    httpCode = 503;
  }

  try {
    const { BlobServiceClient } = require("@azure/storage-blob");
    const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connStr) throw new Error("AZURE_STORAGE_CONNECTION_STRING not set");
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER || "medical-files",
    );
    await containerClient.getProperties();
    status.blob = "connected";
  } catch (err) {
    status.blob = "error: " + err.message;
    status.status = "degraded";
    httpCode = 503;
  }

  res.status(httpCode).json(status);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
