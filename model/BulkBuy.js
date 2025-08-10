const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bulkbuySchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  plant_type: {
    type: String,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("BulkBuy", bulkbuySchema);
