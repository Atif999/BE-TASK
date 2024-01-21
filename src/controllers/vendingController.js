const vendingService = require("../services/vendingService");

const VendingController = {
  deposit: async (req, res) => {
    const { username, coins } = req.body;

    try {
      const result = await vendingService.deposit(username, coins);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  },

  buy: async (req, res) => {
    const { username, productId, amount } = req.body;

    try {
      const result = await vendingService.buy(username, productId, amount);
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
    const username = req.body.username;

    try {
      const result = await vendingService.resetDeposit(username);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  },
};

module.exports = VendingController;
