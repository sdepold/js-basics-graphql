const { Router } = require("express");
const controller = Router();

const imagesNewView = require("../views/images-new");
const imagesShowView = require("../views/images-show");
const { Image } = require("../models");
const path = require("path");

controller.get("/new", (req, res) => {
  res.send(imagesNewView({ user: req.session.user }));
});

controller.post("/new", async (req, res) => {
  if (!req.files.data) {
    throw new Error("No files was uploaded!");
  }

  try {
    const image = await Image.create({
      data: req.files.data,
      user: req.session.user,
    });

    return res.redirect(`/?highlight=${image.id}`);
  } catch (e) {
    console.error(e);
  }
});

controller.get("/:id", async (req, res) => {
  const image = await Image.findOne({
    where: { id: req.params.id },
    include: { all: true, nested: true },
  });

  res.send(imagesShowView({ user: req.session.user, image }));
});

controller.post("/:id/comments", async (req, res) => {
  let image = await Image.findOne({ where: { id: req.params.id } });

  image.createComment({ text: req.body.comment, userId: req.session.user.id });

  res.redirect(302, `/images/${image.id}`);
});

module.exports = controller;
