const Sequelize = require("sequelize");
const { saveBufferToFile } = require("express-fileupload/lib/utilities");
const { resolve } = require("path");
const { Blob } = require("buffer");

const UPLOAD_PATH = resolve(__dirname, "../public/uploads");

module.exports = global.sequelize.define("image", {
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports.store = function (image) {
  const filename = [image.md5, image.name].join("-");
  const path = resolve(UPLOAD_PATH, filename);

  return new Promise((resolve, reject) => {
    saveBufferToFile(Buffer.from(image.data), path, (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ filename, path });
    });
  });
};
