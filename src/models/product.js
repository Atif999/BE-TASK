const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  amountAvailable: { type: Number, required: true },
  cost: { type: Number, required: true },
  productName: { type: String, required: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
