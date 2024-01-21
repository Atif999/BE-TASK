const express = require("express");
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authenticationMiddleware");
const checkSeller = require("../middlewares/checkSeller");
const {
  validateCreateProduct,
  validateUpdateProduct,
  validateDeleteProduct,
} = require("../middlewares/validateProduct");

const router = express.Router();

router.get("/", authMiddleware, ProductController.getProduct);

router.post(
  "/",
  authMiddleware,
  checkSeller,
  validateCreateProduct,
  ProductController.createProduct
);

router.put(
  "/",
  authMiddleware,
  checkSeller,
  validateUpdateProduct,
  ProductController.updateProduct
);

router.delete(
  "/",
  authMiddleware,
  checkSeller,
  validateDeleteProduct,
  ProductController.deleteProduct
);

module.exports = router;
