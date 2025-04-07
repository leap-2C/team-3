import { config } from "dotenv"; config();

export const { PORT, MONGODB_STRING, TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;