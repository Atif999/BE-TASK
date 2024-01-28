const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  amountAvailable: { type: Number, required: true },
  cost: { type: Number, required: true },
  productName: { type: String, required: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const maxProductId = await ProductModel.findOne(
        {},
        {},
        { sort: { productId: -1 } }
      );
      if (maxProductId) {
        this.productId = maxProductId.productId + 1;
      } else {
        this.productId = 1;
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
