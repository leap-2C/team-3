import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { donationRoute } from "./routes/donation-routes";
import { userRoute } from "./routes/user-routes";
import { authRoute } from "./routes/auth-routes";
import { bankCardRoute } from "./routes/bankcard-routes";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8000;

app.use(cors());
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/donation", donationRoute);
app.use("/api/bankcard", bankCardRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", userRoute);

app.listen(port, async () => {
  console.log(`🟢 Server is running`);
});

app.get("/api", (req, res) => {
  res.send("API is running...");
});
