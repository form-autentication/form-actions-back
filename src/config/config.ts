import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
   throw new Error(" Couldn't find .env file Err");
}

export default {
   port: process.env.PORT_BACK || process.env.PORT,

   portFront: process.env.PORT_FRONT!,

   databaseURL: process.env.MONGODB_URI,
};
