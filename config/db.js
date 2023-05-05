const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: __dirname + "/.env" });
const url =
  "mongodb://mishrafirehawk729:9935759084@ac-vv8sir0-shard-00-00.z5w96ok.mongodb.net:27017,ac-vv8sir0-shard-00-01.z5w96ok.mongodb.net:27017,ac-vv8sir0-shard-00-02.z5w96ok.mongodb.net:27017/?ssl=true&replicaSet=atlas-c28z9l-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectDB = async () => {
  console.log("from db");
  console.log(process.env.URI);
  try {
    const connect = await mongoose.connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongoDB connected ${connect}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
};

module.exports = connectDB;
