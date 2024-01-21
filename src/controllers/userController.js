const UserService = require("../services/userService");
const UserController = {
  getUser: async (req, res) => {
    try {
      const { username } = req.body;
      const user = await UserService.getUser(username);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ name: user.username, deposit: user.deposit, role: user.role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, password, deposit } = req.body;

      const userData = { password, deposit };
      await UserService.updateUser(username, userData);

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { username } = req.body;
      await UserService.deleteUser(username);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      await UserService.createUser(userData);

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);

      if (!token) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  logoutAll: async (req, res) => {
    try {
      const username = req.body.username;
      await UserService.logoutAllSessions(username);

      res.status(200).json({ message: "All sessions terminated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
