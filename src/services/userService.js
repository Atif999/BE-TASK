const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserService = {
  getUser: async (username) => {
    return UserModel.findOne({ username });
  },

  updateUser: async (username, userData) => {
    await UserModel.findOneAndUpdate({ username }, userData);
  },

  deleteUser: async (username) => {
    await UserModel.findOneAndDelete({ username });
  },

  createUser: async (userData) => {
    const { password, ...otherUserData } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      password: hashedPassword,
      ...otherUserData,
    });

    await newUser.save();
  },

  login: async (username, password) => {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser && existingUser.password) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (isPasswordValid) {
        const existingToken = jwt.sign({ userId: existingUser._id }, "secret", {
          expiresIn: "1h",
        });

        if (existingUser.tokens.includes(existingToken)) {
          return {
            error: "There is already an active session using your account",
            status: 401,
          };
        }

        existingUser.tokens = [existingToken];
        await existingUser.save();

        return existingToken;
      }
    }
    return { error: "Invalid credentials", status: 401 };
  },

  logoutAllSessions: async (username) => {
    await UserModel.findOneAndUpdate({ username }, { tokens: [] });
  },
};

module.exports = UserService;
