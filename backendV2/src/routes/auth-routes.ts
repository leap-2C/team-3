import express from "express";
import { signIn } from "../resolvers/auth/sign-in";
import { signUp } from "../resolvers/auth/sign-up";
import { refreshAuth } from "../resolvers/auth/refresh-auth";

export const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/signin", signIn);
authRoute.post("/refresh-token", refreshAuth);
