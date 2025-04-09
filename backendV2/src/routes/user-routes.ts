import express from "express";
import { getUsername } from "../resolvers/user-profile/get-username";
import { getUser } from "../resolvers/user-profile/get-user";
import { getUsers } from "../resolvers/user-profile/get-users";
import { postUser } from "../resolvers/user-profile/post-user";
import { putUser } from "../resolvers/user-profile/put-user";

export const userRouter = express.Router();

userRouter.get("/view/:username", getUsername);
userRouter.get("/current-user/:id", getUser);
userRouter.get("/explore", getUsers);
userRouter.post("/:userId", postUser);
userRouter.patch("/:profileId", putUser);