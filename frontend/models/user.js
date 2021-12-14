const fetch = require("cross-fetch");

module.exports = {
  create({ username }) {
    return fetch("http://localhost:5555/rest/users", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        return data.user;
      });
  },

  findOne({ username, apiKey }) {
    let headers = { "Content-Type": "application/json" };
    let url = "http://localhost:5555/rest/users";

    if (apiKey) {
      headers = { ...headers, "api-key": apiKey };
    } else {
      url = `${url}/${username}`;
    }

    return fetch(url, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        return data.user;
      });
  },
};
