import connectToDatabase from "../database/mongodb.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

// app.use("/api/users", usersRouter);

app.listen(port, async () => {
  console.log(`🟢 Server is running on port ${port}`);
  await connectToDatabase();
});