import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import accommodationRoutes from "./routes/accommodation.js";
import professionalRoutes from "./routes/professionals.js";
import viewingRoutes from "./routes/viewing.js";
import openRouterRoutes from "./routes/openRouterRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/accommodation", accommodationRoutes);
app.use("/professional", professionalRoutes);
app.use("/viewing", viewingRoutes);
app.use("/openrouter", openRouterRoutes); // ✅ updated

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default app;
