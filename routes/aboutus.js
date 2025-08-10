const express = require("express");
const router = express.Router();
const aboutusController = require("../controllers/aboutusController");

router.post("/", aboutusController.postAboutUs);
router.get("/", aboutusController.getAboutUs);

module.exports = router;
