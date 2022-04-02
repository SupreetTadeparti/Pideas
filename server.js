const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/Item");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL);

app.get("/", async (_req, res) => {
  const items = await Item.find({});
  res.render("index", { data: items.reverse() });
});

app.post("/new-idea", (req, res) => {
  new Item({ title: req.body.title, description: req.body.description }).save();
  res.send(true);
});

app.listen(PORT);
