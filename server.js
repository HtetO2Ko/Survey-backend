const express = require("express");
const db = require("./model/index");
const cors = require("cors");
const UserRoute = require("./routes/user_route")

const app = express();
const port = 8080;

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(" -------- DB Connected --------");
    console.log(" -------- Drop and resync db --------");
  })
  .catch((e) => {
    console.log("Failed to connect" + e);
  });

app.use("/routes/user_route", UserRoute);

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Survey",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(express.static('public'));
var server = app.listen(port, () => {
  console.log(`-------- Server is listening on port ${port} --------`);
});
