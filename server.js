const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/Item");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

require("dotenv").config();

const PORT = 3000;

const apiOrigin = process.env.ORIGIN ?? `http://localhost:${PORT}`;
const dbOrigin = process.env.DB_URL ?? "mongodb://127.0.0.1:27017/pideas";

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbOrigin);

app.get("/", async (_req, res) => {
  const items = await Item.find({});
  res.render("index", {
    data: items.reverse(),
    origin: apiOrigin,
  });
});

app.post("/new-idea", (req, res) => {
  new Item({ title: req.body.title, description: req.body.description }).save();
  res.send(true);
});

app.listen(PORT, () => console.log(`App is Running on Port ${PORT}`));
