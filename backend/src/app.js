const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const router = require("./router");

const upload = multer({ dest: "tmp/" });

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
  );
});

app.post("/uploadfile", upload.single("myfile"), (req, res) => {
  fs.rename(
    req.file.path,
    `public/assets/images/${req.file.originalname}`,
    (err) => {
      if (err) {
        res.send("problem during travel");
      } else {
        res.send("File uploaded successfully");
      }
    }
  );
});

app.post("/uploadfiles", upload.array("myfiles", 5), (req, res) => {
  req.files.forEach((file) =>
    fs.rename(file.path, `public/assets/images/${file.originalname}`, (err) => {
      if (err) {
        res.send("problem during travel");
      } else {
        res.send("File uploaded successfully");
      }
    })
  );
});

// ready to export
module.exports = app;
