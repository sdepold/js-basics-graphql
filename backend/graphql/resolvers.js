const { Image, User } = require("../models");

const imageResolver = async () => {
  const images = await Image.findAll({ include: { all: true, nested: true } });

  return images;
};

const createCommentResolver = async ({ apiKey, imageId, text }) => {
  console.log(apiKey, imageId, text);
  const user = await User.findOne({ where: { apiKey } });
  const image = await Image.findOne({ where: { id: imageId } });

  if (!user) {
    throw new Error("User not found");
  }
  if (!image) {
    throw new Error("Image not found");
  }

  const comment = await image.createComment({ userId: user.id, text: text });
  
  return { ...comment.get(), user };
};

module.exports = {
  images: imageResolver,
  createComment: createCommentResolver,
};
