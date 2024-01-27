const vendingService = require("../services/vendingService");

const VendingController = {
  deposit: async (req, res) => {
    const { coins } = req.body;
    const userId = req.user._id;
    try {
      const result = await vendingService.deposit(userId, coins);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  },

  buy: async (req, res) => {
    const { productId, amount } = req.body;
    const userId = req.user._id;

    try {
      const result = await vendingService.buy(userId, productId, amount);
      res.status(200).json(result);
    } catch (error) {
      if (error.code == 400) {
        res.status(400).json({ message: "Insufficient funds" });
      } else {
        res.status(500).json({ message: "Internal Server Error!" });
      }
    }
  },

  reset: async (req, res) => {
    const userId = req.user._id;
    try {
      const result = await vendingService.resetDeposit(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  },
};

module.exports = VendingController;
