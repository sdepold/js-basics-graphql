const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Sequelize = require("sequelize");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);

const app = express();

global.sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "database.sqlite",
});

const sequelizeSessionStore = new SessionStore({
  db: global.sequelize,
});

app.use(morgan("dev")); // Logs request status and duration
app.use(express.static("public")); // Serves files in the public directory
app.use(bodyParser.json({ limit: "100mb" })); // Parses request bodies
app.use(fileUpload({ createParentPath: true })); // Converts file uploads
app.use(
  expressSession({
    // Configures session handling
    secret: "keep it secret, keep it safe.",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes are registered here
app.use("/rest", require("./controllers/rest/users"));
app.use("/rest", require("./controllers/rest/images"));

(async () => {
  // Synchronize our models with the database
  await global.sequelize.sync();

  // Start the server on port 5555
  app.listen(5555, () => {
    console.log(`API is now listening on http://localhost:5555`);
  });
})();
