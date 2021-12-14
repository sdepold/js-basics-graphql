const fetch = require("cross-fetch");

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
      .then((images) =>
        images.map((image) => ({
          ...image,
          url: `http://localhost:5555/uploads/${image.filename}`,
        }))
      );
  },

  findOne(id) {
    return this.findAll().then((images) =>
      images.find((image) => image.id === id)
    );
  },
};
