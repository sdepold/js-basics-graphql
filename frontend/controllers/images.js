const { Router } = require("express");
const controller = Router();

const imagesNewView = require("../views/images-new");
const imagesShowView = require("../views/images-show");
const { Image, Comment } = require("../models");

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
  const image = await Image.findOne(Number(req.params.id));
  const comments = await Comment.findAll(image.id);

  res.send(imagesShowView({ user: req.session.user, image, comments }));
});

controller.post("/:id/comments", async (req, res) => {
  await Comment.create(
    Number(req.params.id),
    req.session.user,
    req.body.comment
  );

  res.redirect(302, `/images/${req.params.id}`);
});

module.exports = controller;
