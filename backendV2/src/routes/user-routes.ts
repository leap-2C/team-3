import express from "express";
import { getUsername } from "../resolvers/user-profile/get-username";
import { getUser } from "../resolvers/user-profile/get-user";
import { getUsers } from "../resolvers/user-profile/get-users";
import { postUser } from "../resolvers/user-profile/post-user";
import { putUser } from "../resolvers/user-profile/put-user";

export const userRoute = express.Router();

userRoute.get("/view/:username", getUsername);
userRoute.get("/current-user/:id", getUser);
userRoute.get("/explore", getUsers);
userRoute.post("/:userId", postUser);
userRoute.patch("/:profileId", putUser);
