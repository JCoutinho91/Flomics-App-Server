const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const UserResult = require("./../models/user.results.model");

router.get("/api/users", isAuthenticated, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/current  - Get current user info

router.get("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id)
      .populate("samples")
      .populate("requests");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/api/user/edit/:userId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      // If the user is authenticated we can access the JWT payload via req.payload
      // req.payload holds the user info that was encoded in JWT during login.
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }
      const { samples } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { samples: samples },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
