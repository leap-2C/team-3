"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const sign_in_1 = require("../resolvers/auth/sign-in");
const sign_up_1 = require("../resolvers/auth/sign-up");
const refresh_auth_1 = require("../resolvers/auth/refresh-auth");
const verifyEmail_1 = require("../controllers/verifyEmail");
exports.authRoute = express_1.default.Router();
exports.authRoute.post("/signup", sign_up_1.signUp);
exports.authRoute.post("/signin", sign_in_1.signIn);
exports.authRoute.post("/refresh-token", refresh_auth_1.refreshAuth);
exports.authRoute.post("/verify-email", verifyEmail_1.verifyEmail);
