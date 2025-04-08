import express from "express";
import { getUsername } from "../resolvers/user-profile/get-username.js";
import { getUser } from "../resolvers/user-profile/get-user.js";
import { getUsers } from "../resolvers/user-profile/get-users.js";
import { postUser } from "../resolvers/user-profile/post-user.js";
import { putUser } from "../resolvers/user-profile/put-user.js";

export const userRouter = express.Router();

userRouter.get("/view/:username", getUsername);
userRouter.get("/current-user", getUser);
userRouter.get("/explore", getUsers);
userRouter.post("/:userId", postUser);
userRouter.patch("/:profileId", putUser);
 