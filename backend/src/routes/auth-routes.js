import express from "express";
import { signIn } from "../resolvers/auth/authSignIn.js";
import { signUp } from "../resolvers/auth/authSignUp.js";

export const authRouter = express.Router();

// Sign Up Router
authRouter.post("/signup", signUp);
// Sign In Router
authRouter.post("/signin", signIn);
//
