const ProductService = require("../services/productService");
const ProductModel = require("../models/product");

const ProductController = {
  getProduct: async (req, res) => {
    try {
      const { productId } = req.body;
      const product = await ProductService.getProductById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const sellerId = req.user._id;
      const { productName, cost, amountAvailable } = req.body;
      const productData = {
        cost,
        amountAvailable,
        productName,
        sellerId,
      };
      await ProductService.createProduct(productData);

      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.body.productId;
      const product = await ProductModel.findOne({ productId });
      if (!product) {
        return null;
      }

      if (req.user._id.toString() === product.sellerId.toString()) {
        const { amountAvailable, cost, productName } = req.body;
        const productData = { amountAvailable, cost, productName };
        await ProductService.updateProduct(productId, productData);
        res.status(200).json({ message: "Product updated successfully" });
      } else {
        res.status(200).json({ message: "You cant update this product!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.body.productId;
      const product = await ProductModel.findOne({ productId });
      if (!product) {
        return null;
      }
      if (req.user._id.toString() === product.sellerId.toString()) {
        await ProductService.deleteProduct(productId);

        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(200).json({ message: "You cant delete this product!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
