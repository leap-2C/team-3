"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const get_username_1 = require("../resolvers/user-profile/get-username");
const get_user_1 = require("../resolvers/user-profile/get-user");
const get_users_1 = require("../resolvers/user-profile/get-users");
const post_user_1 = require("../resolvers/user-profile/post-user");
const put_user_1 = require("../resolvers/user-profile/put-user");
const auth_middleware_1 = require("../middleware/auth-middleware");
exports.userRoute = express_1.default.Router();
exports.userRoute.get("/view/:username", get_username_1.getUsername);
exports.userRoute.get("/current-user/:id", get_user_1.getUser);
exports.userRoute.get("/explore", get_users_1.getUsers);
exports.userRoute.post("/:userId", auth_middleware_1.authenticateToken, post_user_1.postUser);
exports.userRoute.patch("/:profileId", auth_middleware_1.authenticateToken, put_user_1.putUser);
