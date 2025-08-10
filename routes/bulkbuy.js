const express = require("express");
const router = express.Router();
const bulkbuyController = require("../controllers/bulkbuyController");

router.post("/", bulkbuyController.postOrder);
router.get("/", bulkbuyController.getOrders);

module.exports = router;
