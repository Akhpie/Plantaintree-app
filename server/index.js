import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import companiesRoute from "./routes/companiesRoute.js";
import maintenanceRoute from "./routes/maintenanceRoute.js";
import settingRoute from "./routes/settingRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API is working!");
});

// MongoDB connection
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/companies", companiesRoute);
app.use("/maintenance", maintenanceRoute);
app.use("/settings", settingRoute);

app.get("/world", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
