const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Model = require("../models/Model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("model"), async (req, res) => {
  try {
    const newModel = new Model({
      name: req.body.name,
      fileUrl: req.file.filename,
    });

    await newModel.save();

    res.status(201).json({
      message: "Model uploaded successfully",
      data: newModel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/models", async (req, res) => {
  try {
    const models = await Model.find();

    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;