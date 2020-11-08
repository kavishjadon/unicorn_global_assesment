if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./config/db");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// This will insert dummy data in database just for testing purposes
// Comment below line if running development mode(npm run dev)
require("./data/populateDB");

app.use(express.json());
app.use(express.static("build"));

app.use("/api/", routes);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

db.once("open", () => {
  console.log(`Database connected successfully`);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
