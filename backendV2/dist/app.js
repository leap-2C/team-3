"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const donation_routes_1 = require("./routes/donation-routes");
const user_routes_1 = require("./routes/user-routes");
const auth_routes_1 = require("./routes/auth-routes");
const bankcard_routes_1 = require("./routes/bankcard-routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/donation", donation_routes_1.donationRoute);
app.use("/api/bankcard", bankcard_routes_1.bankCardRoute);
app.use("/api/auth", auth_routes_1.authRoute);
app.use("/api/profile", user_routes_1.userRoute);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🟢 Server is running`);
}));
app.get("/api", (req, res) => {
    res.send("API is running...");
});
