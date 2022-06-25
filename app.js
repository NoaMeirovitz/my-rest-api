var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var auth = require("./middleware/auth");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const customersRouter = require("./routes/customers");
const businessesRouter = require("./routes/businesses");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));

app.use("/", indexRouter);
app.use("/users", auth, usersRouter);
app.use("/customers", customersRouter);
app.use("/businesses", businessesRouter);

module.exports = app;
