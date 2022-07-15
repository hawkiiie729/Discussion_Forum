const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("from db");
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://Sudhanshu:firehawk@cluster0.j2lb7kf.mongodb.net/?retryWrites=true&w=majority",
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
