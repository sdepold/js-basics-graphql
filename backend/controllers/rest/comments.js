const { Router } = require("express");
const controller = Router();
const { Image, User, Comment } = require("../../models");

controller.get("/images/:id/comments", async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      imageId: req.params.id,
    },
  });

  res.json(comments);
});

controller.post("/images/:id/comments", async (req, res) => {
  const user = await User.findOne({
    where: { apiKey: req.headers["api-key"] },
  });
  const image = await Image.findOne({ where: { id: req.params.id } });
  const comment = await image.createComment({ userId: user.id, text: req.body.text });

  res.json({ comment });
});

module.exports = controller;
