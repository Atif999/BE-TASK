const ProductModel = require("../models/product");
const ProductService = {
  getProductById: async (productId) => {
    return ProductModel.findOne({ productId });
  },

  createProduct: async (productData) => {
    const newProduct = new ProductModel(productData);
    await newProduct.save();
  },

  updateProduct: async (productId, productData) => {
    await ProductModel.findOneAndUpdate({ productId }, productData);
  },

  deleteProduct: async (productId) => {
    await ProductModel.findOneAndDelete({ productId });
  },
};

module.exports = ProductService;
