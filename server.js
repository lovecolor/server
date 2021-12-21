var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
var fs = require("fs");

// var user = {
//   user4: {
//     name: "mohit",
//     password: "password4",
//     profession: "teacher",
//     id: 4,
//   },
// };
app.get("/blogs", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "blogs.json", "utf8", function (err, data) {
    var blogs = JSON.parse(data);

    // console.log(blogs);
    res.end(JSON.stringify(blogs));
  });
});
app.get("/blogs/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "blogs.json", "utf8", function (err, data) {
    var blogs = JSON.parse(data);
    var blog = blogs.find((x) => x.code == req.params.id);
    // console.log(blog);
    res.end(JSON.stringify(blog));
  });
});
app.post("/blogs", function (req, res) {
  
  // First read existing users.
  fs.readFile(__dirname + "/" + "blogs.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    // console.log("body", req.body);
    data.push({
      ...req.body,
      id: data[data.length - 1] + 1,
    });
    console.log(data);
    res.end(JSON.stringify(data));
  });
});
app.put("/blogs/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "blogs.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data.map((x) => (x === req.params.id ? { ...req.body, id: x.id } : x));

    console.log(data);
    res.end(JSON.stringify(data));
  });
});
app.delete("/blogs/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "blogs.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data = data.filter((x) => x !== req.params.id);

    console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
