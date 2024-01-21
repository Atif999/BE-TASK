const express = require("express");
const VendingController = require("../controllers/vendingController");
const authMiddleware = require("../middlewares/authenticationMiddleware");
const checkBuyer = require("../middlewares/checkBuyer");
const {
  validateDeposit,
  validateBuy,
  validateReset,
} = require("../middlewares/validateVending");

const router = express.Router();

router.put(
  "/deposit",
  authMiddleware,
  checkBuyer,
  validateDeposit,
  VendingController.deposit
);

router.put(
  "/buy",
  authMiddleware,
  checkBuyer,
  validateBuy,
  VendingController.buy
);

router.put(
  "/reset",
  authMiddleware,
  checkBuyer,
  validateReset,
  VendingController.reset
);

module.exports = router;
