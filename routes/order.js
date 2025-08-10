const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.postOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderbyid);
router.get("/user/:id", orderController.getOrderbyuserid);
router.put("/:id/status", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
