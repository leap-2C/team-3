import donationsRouter from "../src/routes/donation-routes.js";
import bankCardRouter from "./routes/bankcard-routes.js";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";
import connectToDatabase from "../database/mongodb.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("api/donation", donationsRouter);
app.use("api/bankcard", bankCardRouter);
app.use("api/auth", authRouter);
app.use("api/profile", userRouter);

app.listen(port, async () => {
  console.log(`🟢 Server is running on port ${port}`);
  await connectToDatabase();
});
