const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Request = require("./../models/requests.model");
const User = require("./../models/user.model");

router.post("/api/request/new", async (req, res, next) => {
  try {
    const { name, size, status, variants, userIdentify, observations } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(userIdentify)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const createdRequest = await Request.create({
      name,
      size,
      status,
      variants,
      userId: userIdentify,
      observations,
    });

    await User.findByIdAndUpdate(userIdentify, {
      $push: { requests: createdRequest._id },
    });
    res.status(201).json(createdRequest);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/requests", async (req, res, next) => {
  try {
    const allRequests = await Request.find();
    res.status(200).json(allRequests);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }
    const oneRequest = await Request.findById(requestId);

    res.status(200).json(oneRequest);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/api/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const { status, variants, observations } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status, variants, observations },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/api/results/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    await Request.findByIdAndDelete(requestId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
