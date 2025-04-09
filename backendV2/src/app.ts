import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import donationRoute from "./routes/donation-routes";
// import { userRoute } from "./routes/userRoute";
// import { authRoute } from "./routes/authRoute";
// import { bankCardRoute } from "./routes/bankCardRoute";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/donation", donationRoute);
// app.use("/api/bankcard", bankCardRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/profile", userRoute);

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
