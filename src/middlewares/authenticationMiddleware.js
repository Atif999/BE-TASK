const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const decoded = jwt.verify(token, "secret");
    const user = await UserModel.findOne({
      _id: decoded.userId,
      tokens: token,
    });

    if (!user) {
      throw new Error(); // Invalid user or token
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
