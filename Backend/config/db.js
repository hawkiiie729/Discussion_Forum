const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("from db");
  console.log(process.env.URI);
  try {
    const connect = await mongoose.connect(
      process.env.URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`mongoDB connected ${connect}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
};

module.exports = connectDB;
