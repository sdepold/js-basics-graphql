const { Router } = require("express");
const controller = Router();
const User = require("../../models/user");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

async function handleUserLookup(where, res) {
  const user = await User.findOne({ where });

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: "User not found" });
  }
}

controller.get("/users/me", async (req, res) => {
  handleUserLookup({ apiKey: req.headers["api-key"] }, res);
});

controller.get("/users/:usernameOrId", async (req, res) => {
  handleUserLookup(
    {
      [Op.or]: [
        { username: req.params.usernameOrId },
        { id: req.params.usernameOrId },
      ],
    },
    res
  );
});

controller.post("/users", async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      apiKey: uuidv4(),
    });

    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);

    const error = e.errors
      ? e.errors.map((e) => e.message).join(", ")
      : e.message;

    res.json({ error });
  }
});

module.exports = controller;
