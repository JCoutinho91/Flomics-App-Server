const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("./../models/user.model");
const UserResult = require("./../models/user.results.model");

router.post("/api/results/new", async (req, res, next) => {
  try {
    const {
      sampleId,
      company,
      date,
      Beta,
      Gamma,
      Kappa,
      Delta,
      Alpha,
      Lambda,
      Mu,
      Omicron,
      userIdentify,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userIdentify)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const createdSubmission = await UserResult.create({
      sampleId,
      company,
      date,
      Beta,
      Gamma,
      Kappa,
      Delta,
      Alpha,
      Lambda,
      Mu,
      Omicron,
      userId: userIdentify,
    });

    await User.findByIdAndUpdate(userIdentify, {
      $push: { samples: createdSubmission._id },
    });
    res.status(201).json(createdSubmission);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/results", async (req, res, next) => {
  try {
    const allUserResults = await UserResult.find();
    res.status(200).json(allUserResults);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/results/:resultsId", async (req, res, next) => {
  try {
    const { resultsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(resultsId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }
    const oneResult = await UserResult.findById(resultsId);

    res.status(200).json(oneResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/api/results/:resultsId", async (req, res, next) => {
  try {
    const { resultsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(resultsId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const {
      sampleId,
      company,
      date,
      Beta,
      Gamma,
      Kappa,
      Delta,
      Alpha,
      Lambda,
      Mu,
      Omicron,
    } = req.body;

    const updatedResult = await UserResult.findByIdAndUpdate(
      resultsId,
      { sampleId, company, date, Variant, file },
      { new: true }
    );

    res.status(200).json(updatedResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/api/results/:resultsId", async (req, res, next) => {
  try {
    const { resultsId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(resultsId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    await UserResult.findByIdAndDelete(resultsId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
