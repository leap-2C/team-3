import mongoose from "mongoose";
import { MONGODB_STRING } from "../config/env.js";

if (!MONGODB_STRING) {
	throw new Error(`Missing MongoDB STRING in env file`)
}

const connectToDatabase = async () => {
	try {
		await mongoose.connect(MONGODB_STRING)
		console.log(`🍃 Connected to Database`)
	}
	catch (err) {
		console.log(err, `Error occurred`)
	}
}

export default connectToDatabase