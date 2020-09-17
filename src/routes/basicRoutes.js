const express = require("express");

const Bear = require("../models/bear");
const { json } = require("express");

const basicRouter = express.Router();

basicRouter
  .route("/bears/new")
  .get((req, res) => {
    res.render('addbear')
  })
  .post((req, res) => {
    const bear = new Bear(req.body);
    bear.save((err, bear) => {
      if (err) return console.err;
      res.json({ message: "Bear created!", bear });
    });
  });
  basicRouter.get('/bears',(req, res) => {
    Bear.find({}, (err, bears) => {
      if (err) return console.error(err);
      res.render("bears", {bears: bears});
    });
  });
  basicRouter.route("/bears/:id")
    .get((req, res) => {
      Bear.findById({_id: req.params.id}, (err, bear) => {
        if (err) return console.error(err);
        res.render("bear", {bear: bear});
      })
    })

module.exports = basicRouter;
