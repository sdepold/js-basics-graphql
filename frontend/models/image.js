const fetch = require("cross-fetch");
const comment = require("./comment");
const User = require("./user");

module.exports = {
  create({ data, user }) {
    return fetch("http://localhost:5555/rest/images", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        "api-key": user.apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        return data.image;
      });
  },

  findAll() {
    return fetch("http://localhost:5555/rest/images", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (images) =>
        Promise.all(
          images.map(async (image) => {
            const user = await User.findOne({ username: image.userId });
            const comments = await comment.findAll(image.id);

            return {
              ...image,
              url: `http://localhost:5555/uploads/${image.filename}`,
              user,
              comments,
            };
          })
        )
      );
  },

  findOne(id) {
    return this.findAll().then((images) =>
      images.find((image) => image.id === id)
    );
  },
};
