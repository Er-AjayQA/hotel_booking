// Import Statements
import express from "express";
import "dotenv/config";
import cors from "cors";
const PORT = process.env.PORT || 3000;
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebHooks.js";

// Initialize App
connectDB();
const app = express();

// API to Listen Clerk Webhooks
app.use(
  clerkMiddleware({
    ignoredRoutes: ["/api/clerk"], // Exclude webhook
  })
);
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get("/", (req, res) => res.send("API is working fine!!"));

// Only listen locally during development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Local: http://localhost:${PORT}`));
}
