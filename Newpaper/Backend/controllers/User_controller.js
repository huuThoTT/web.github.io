const User = require('../models/User_model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];

const userController = {
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        role: req.body.role || 'user', // Assign default role as 'user'
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "10m" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Incorrect username");
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        const accessToken = userController.generateAccessToken(user);
        const refreshToken = userController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = userController.generateAccessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  logOut: async (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },

  update: async (req, res) => {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted', deletedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getPreferences: async (req, res) => {
    try {
      const userId = req.user.id; // Lấy ID của user từ req.user.id
      const user = await User.findById(userId).populate('preferences.categories.category');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.preferences);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updatePreferences: async (req, res) => {
    try {
      const userId = req.user.id;
      const { categoryId, topics } = req.body; 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      let categoryPreference = user.preferences.categories.find(cat => cat.category.toString() === categoryId);
      if (categoryPreference) {
        categoryPreference.topics.push(...topics.filter(topic => !categoryPreference.topics.includes(topic)));
      } else {
        user.preferences.categories.push({ category: categoryId, topics });
      }
      await user.save();
      res.json(user.preferences);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = userController;
