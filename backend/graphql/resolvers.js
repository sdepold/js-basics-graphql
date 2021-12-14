const { Image } = require("../models");

const imageResolver = async () => {
  const images = await Image.findAll({ include: { all: true, nested: true } });

  return images;
};

module.exports = {
  images: imageResolver,
};
