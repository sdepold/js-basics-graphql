const { Router } = require("express");
const controller = Router();
const { Image, User } = require("../../models");

controller.post("/images", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { apiKey: req.headers["api-key"] },
    });
    const { filename, path } = await Image.store(req.body.data);
    const image = await user.createImage({ filename });

    res.json({ image });
  } catch (e) {
    console.error(e);
  }
});

controller.get("/images", async (req, res) => {
  const images = await Image.findAll();
  res.json(images);
});

controller.get("/images/:id", async (req, res) => {
  const image = await Image.findOne({
    where: { id: req.params.id },
  });

  res.json({ image });
});

module.exports = controller;
