const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/estiam_bearsdb", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`[MongoDB is connected!]`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");
const bearsRoute = require("./routes/basicRoutes");
const router = express.Router();
// midlleware to use for all request... it's like a poo
router.use((req, res, next) => {
  console.log("Something happening!");
  next();
});
router.get("/", (req, res) => {
  res.json({ msg: "Welcome to our api!" });
});

app.use("/api", bearsRoute);

app.listen(port, () => {
  console.log(`[Appplication is running 🐳 : ${port}]`);
});
