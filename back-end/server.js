const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const multer = require("multer");
const upload = multer({
  dest: "../front-end/public/images/",
  limits: {
    fileSize: 10000000,
  },
});

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/code-tastrophy", {
  useNewUrlParser: true,
});

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  path: String,
  solution: String,
});

const Problem = mongoose.model("Problem", problemSchema);

app.post("/api/photos", upload.single("photo"), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename,
  });
});

app.post("/api/problems", async (req, res) => {
  const problem = new Problem({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
    solution: "",
  });
  try {
    await problem.save();
    res.send(problem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/problems", async (req, res) => {
  try {
    let problems = await Problem.find();
    res.send(problems);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/problems/:id", async (req, res) => {
  try {
    let problem = await Problem.findOne({
      _id: req.params.id,
    });
    problem.solution = req.body.solution;
    problem.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/problems/:id", async (req, res) => {
  try {
    await Problem.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server listening on port 3000!"));
