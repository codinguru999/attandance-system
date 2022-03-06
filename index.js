const express = require("express");
const app = express();
const fs = require("fs");
var ba64 = require("ba64");
app.use(express.static("public"));
// app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.get("/data", (req, res) => {
  let data = fs.readFileSync("database.json", "utf-8");
  let imgurl = req.query.url;
  delete req.query.url;
  data = JSON.parse(data);
  data.push(req.query);
  ba64.writeImageSync('images/'+req.query.name.split(" ")[0]+'-'+req.query.emp, imgurl);
  fs.writeFileSync("database.json", JSON.stringify(data));
  res.send("dane");
});
app.listen(80, () => console.log("running at http://localhost"));
