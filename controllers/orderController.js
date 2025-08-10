const Order = require("../model/Order.js");
const mongoose = require("mongoose");
const multer = require("multer");

// Use memory storage to get file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Wrap your route with multer to handle files
const postOrder = [
  upload.any(), // Accept any files with field names like items[0][prescriptionFile]
  async (req, res) => {
    try {
      console.log("Posting Order");
      // 1. Parse `orderDetails`
      const orderDetails = JSON.parse(req.body.orderDetails);

      // 2. Parse items
      let items = [];
      try {
        items = JSON.parse(req.body.cart);
      } catch {
        items = req.body.cart || [];
      }

      // 3. Attach file paths to corresponding items
      req.files.forEach((file) => {
        const match = file.fieldname.match(
          /cart\[(\d+)\]\[presDetails]\[prescriptionFile\]/
        );
        if (match) {
          const itemIndex = Number(match[1]);
          if (items[itemIndex]) {
            // Save the binary buffer and MIME type (optional)
            items[itemIndex].presDetails.prescriptionFile = {
              data: file.buffer,
              contentType: file.mimetype,
            };
          }
        }
      });

      // 4. Calculate totals
      const shipping_rate = 1000;
      const products_amount =
        items.reduce(
          (accum, item) =>
            accum + (parseInt(item.price) || 0) * parseInt(item.qty),
          0
        ) || 0;
      const totalAmount = products_amount + shipping_rate;

      // console.log(items, totalAmount);

      // 5. Build order object
      const orderBody = {
        orderDetails,
        paymentMethod: req.body.paymentMethod,
        user: req.body.user || null,
        cart: items,
        totalAmount,
      };

      // 6. Save to DB
      const order = await Order.create(orderBody);

      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
];

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      {},
      {
        _id: 1,
        timestamp: 1,
        totalAmount: 1,
        status: 1,
        "orderDetails.name": 1,
        "orderDetails.email": 1,
      }
    ).lean();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getOrderbyuserid = async (req, res) => {
  // console.log("getOrderbyUserid");
  // console.log(req.params.id);
  const objectId = mongoose.Types.ObjectId(req.params.id);
  try {
    const order = await Order.find({ user: objectId });
    // console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getOrderbyid = async (req, res) => {
  try {
    // Find order by 'id' field (assuming 'id' is a custom field, not _id)
    const order = await Order.findOne({ _id: req.params.id }).lean(); // use .lean() to get plain JS object

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Convert prescriptionFile buffers to base64 strings with data URI
    order.cart.forEach((item) => {
      if (item.presDetails.prescriptionFile && item.presDetails.prescriptionFile.data) {
        item.presDetails.prescriptionFileBase64 = `data:${
          item.presDetails.prescriptionFile.contentType
        };base64,${item.presDetails.prescriptionFile.data.toString("base64")}`;
        delete item.presDetails.prescriptionFile; // remove buffer data from response to reduce size
      }
    });

    console.log(order);

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  // console.log("getOrderbyid");
  // console.log(req.params.id);
  // console.log(req.body.status);

  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  console.log("deleteOrder");
  console.log(req.params.id);

  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postOrder,
  getOrders,
  getOrderbyid,
  updateOrderStatus,
  getOrderbyuserid,
  deleteOrder,
  postOrder,
};
