import { donationRoute } from "./routes/donation-routes";
import { bankCardRoute } from "./routes/bankcard-routes";
import { userRoute } from "./routes/user-routes";
import { authRoute } from "./routes/auth-routes";
import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { URLrouter } from "./routes/check-url-routes";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8000;



const allowedOrigins = ["http://localhost:3000", "https://buymecoffe.vercel.app"];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/donation", donationRoute);
app.use("/api/bankcard", bankCardRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", userRoute);
app.use("/api/check", URLrouter);
app.get("/api", (req, res) => {
  res.send("API is running...");
});

app.listen(port, async () => {
  console.log(`🟢 Server is running on port ${port}`);
});
