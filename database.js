const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MANGOO_DB_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
("mongodb+srv://HalaHala:Hh123Zz123@halacoded.asdvs.mongodb.net/");
