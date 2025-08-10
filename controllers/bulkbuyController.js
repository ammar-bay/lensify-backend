const BulkBuy = require("../model/BulkBuy");

const postOrder = async (req, res) => {
  console.log(req.body);
  try {
    const order = new BulkBuy(req.body);
    await order.save();
    res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not Save the Form" });
  }
  res.sendStatus(200);
};

const getOrders = async (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
};

module.exports = { postOrder, getOrders };
