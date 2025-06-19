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

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(clerkMiddleware());

// API to Listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API is working fine!!"));

// Listen to Server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});
