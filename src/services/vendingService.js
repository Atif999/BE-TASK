const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const calculateChange = require("../helper/calculateChange");
const vendingService = {
  deposit: async (userId, coin) => {
    const validCoins = [5, 10, 20, 50, 100];
    if (!validCoins.includes(coin)) {
      throw new Error("Invalid coin");
    }

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    user.deposit = (user.deposit || 0) + coin;
    await user.save();

    return { message: "Deposit successful", deposit: user.deposit };
  },

  buy: async (userId, productId, amount) => {
    const user = await UserModel.findOne({ _id: userId });
    const product = await ProductModel.findOne({ productId });

    if (!user || !product) {
      throw new Error("User or product not found");
    }

    user.deposit = user.deposit || 0;

    if (user.deposit < product.cost * amount) {
      const error = new Error("Insufficient funds");
      error.code = "400";
      throw error;
    }

    user.deposit -= product.cost * amount;
    await user.save();

    product.amountAvailable -= amount;
    await product.save();

    const change = calculateChange(user.deposit);

    return {
      message: "Purchase successful",
      product: product.productName,
      amountSpent: product.cost,
      change,
    };
  },

  resetDeposit: async (userId) => {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    user.deposit = 0;
    await user.save();
    return { message: "Deposit reset successful", deposit: user.deposit };
  },
};

module.exports = vendingService;
