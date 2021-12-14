const fetch = require("cross-fetch");
const User = require("./user");

module.exports = {
  create(imageId, user, comment) {
    return fetch(`http://localhost:5555/rest/images/${imageId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text: comment }),
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

        return data.comment;
      })
      .then(enrichWithUser);
  },

  findAll(imageId) {
    return fetch(`http://localhost:5555/rest/images/${imageId}/comments`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((comments) => Promise.all(comments.map(enrichWithUser)));
  },
};

async function enrichWithUser(comment) {
  const user = await User.findOne({ username: comment.userId });

  return { ...comment, user };
}
