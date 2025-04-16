"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRoute = void 0;
const express_1 = __importDefault(require("express"));
const create_donation_1 = __importDefault(require("../resolvers/donation/create-donation"));
const get_total_amount_1 = __importDefault(require("../resolvers/donation/get-total-amount"));
const get_sent_donation_1 = __importDefault(require("../resolvers/donation/get-sent-donation"));
const get_all_donation_1 = __importDefault(require("../resolvers/donation/get-all-donation"));
exports.donationRoute = express_1.default.Router();
exports.donationRoute.post("/create-donation", create_donation_1.default);
exports.donationRoute.get("/total-earnings/:userId", get_total_amount_1.default);
exports.donationRoute.get("/search-donations/:userId", get_sent_donation_1.default);
exports.donationRoute.get("/received/:userId", get_all_donation_1.default);
