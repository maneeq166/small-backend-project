const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const directoryPath = path.join(__dirname, "files");
  fs.readdir(directoryPath, function (err, files) {
    console.log("Files:", files); // Debugging output
    res.render("index", { files: files });
  });
});
app.get("/files/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});
app.get("/edit/:filename", function (req, res) {
})
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("") + "txt"}`,
    req.body.details,
    function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
