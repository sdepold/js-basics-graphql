const fetch = require("cross-fetch");

const FIND_ALL_QUERY = `
{
    images {
        id
        filename
        user {
            id
            username
        }
        comments {
            text
            user {
                id
                username
            }
        }
    }
}
`;

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
      })
      .then(sanitizeImage);
  },

  findAll() {
    return fetch("http://localhost:5555/graphql", {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ query: FIND_ALL_QUERY }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => res.data.images)
      .then(async (images) => Promise.all(images.map(sanitizeImage)));
  },

  findOne(id) {
    return this.findAll().then((images) =>
      images.find((image) => image.id === id)
    );
  },
};

async function sanitizeImage(image) {
  return {
    ...image,
    url: `http://localhost:5555/uploads/${image.filename}`,
  };
}
