const checkSeller = async (req, res, next) => {
  try {
    if (req.user.role == "seller") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to access products!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkSeller;
