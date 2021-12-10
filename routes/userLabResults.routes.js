const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userResults = require("./../models/user.results.model");

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
      file,
    } = req.body;
    const createdSubmission = await userResults.create({
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
      file,
    });
    res.status(201).json(createdSubmission);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/results", async (req, res, next) => {
  try {
    const allUserResults = await userResults.find();
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
    const oneResult = await userResults.findById(resultsId);

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

    const updatedResult = await userResults.findByIdAndUpdate(
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

    await userResults.findByIdAndDelete(resultsId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
