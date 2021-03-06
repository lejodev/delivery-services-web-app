const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./src/routes/User");
const motorcyclist = require("./src/routes/Motorcyclists");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const path = require("path");
const cors = require("cors");

require("dotenv/config");

const JWT_SECRET = process.env.JWTSecret;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to the database");
});

app.use(
  expressJWT({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/user/create",
      "/user/login",
      "https://delivery-services-1.herokuapp.com/",
    ],
  })
);

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/motorcyclist", motorcyclist);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  // Serve a static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "frontend/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
