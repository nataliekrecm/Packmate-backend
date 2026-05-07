const express = require("express");
const app = express();
const port = 8888;

const tripController = require("./controller/trip");
const itemController = require("./controller/item");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("PackMate API is running!");
});

app.use("/trip", tripController);
app.use("/item", itemController);

app.listen(port, () => {
  console.log(`PackMate server listening on port ${port}`);
});