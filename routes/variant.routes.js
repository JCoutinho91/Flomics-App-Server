const express = require("express");
const router = express.Router();
const Variant = require("./../models/variant.model");
const mongoose = require("mongoose");

router.post("/api/variant", async (req, res, next) => {
  try {
    res.status(201).json(createdInfo);
  } catch (error) {
    res.status(500).json(error); // Internal Server Error
  }
});

router.get("/api/variant", async (req, res, next) => {
  try {
    const allVariant = await Variant.find();
    res.status(200).json(allVariant);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
