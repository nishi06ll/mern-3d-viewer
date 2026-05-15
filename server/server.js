const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const modelRoutes = require("./routes/modelRoutes");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api", modelRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});