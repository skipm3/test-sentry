const express = require("express");
const router = express.Router();

const testController = require("../controllers/test");

router.get("/", testController.test);
router.get("/outside", (req, res) => {
  throw new Error("Outside the controller");
});

module.exports = router;
