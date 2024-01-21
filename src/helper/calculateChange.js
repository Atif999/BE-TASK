const calculateChange = (amount) => {
  const coins = [100, 50, 20, 10, 5];
  const change = [];

  for (const coin of coins) {
    const count = Math.floor(amount / coin);
    if (count > 0) {
      change.push(...Array(count).fill(coin));
      amount %= coin * count;
    }
  }

  return change;
};

module.exports = calculateChange;
