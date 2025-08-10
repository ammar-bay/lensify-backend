const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutusSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("AboutUs", aboutusSchema);
