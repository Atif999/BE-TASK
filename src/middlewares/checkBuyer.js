const checkBuyer = async (req, res, next) => {
  try {
    if (req.user.role == "buyer" && req.user.username == req.body.username) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to change deposit!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkBuyer;
