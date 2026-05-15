const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Model = require("../models/Model");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "3d-models",
    resource_type: "raw",
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("model"), async (req, res) => {
  try {
    const newModel = new Model({
      name: req.body.name,
      fileUrl: req.file.path,
    });
    await newModel.save();
    res.status(201).json({ message: "Model uploaded successfully", data: newModel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/models", async (req, res) => {
  try {
    const models = await Model.find();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;