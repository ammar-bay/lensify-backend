const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  cart: [
    {
      id: { type: String },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      imgUrl: { type: String, required: true },
      slug: { type: String, required: true },
      lensCat: { type: String, required: true },
      lensType: { type: String, required: true },
      lasserToggle: { type: String, required: true },
      presDetails: {
        type: { type: String },
        axis: { type: String },
        cylinder: { type: String },
        sphere: { type: String },
        prescriptionFile: {
          data: Buffer, // This will store the binary data of the image
          contentType: String, // e.g. "image/jpeg"
        },
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orderDetails: {
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    // address2: { type: String },
    // city: { type: String, required: true },
    email: { type: String },
    // shipping_area: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
