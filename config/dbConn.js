const mongoose = require("mongoose");

const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gkc8xbz.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    console.log(DB)
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log("Could not connect to DB");
    console.error(err);
  }
};

module.exports = connectDB;
