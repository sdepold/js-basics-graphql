const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

const app = express();

app.use(morgan("dev")); // Logs request status and duration
app.use(express.static("public")); // Serves files in the public directory
app.use(bodyParser.urlencoded({ extended: true })); // Parses request bodies
app.use(fileUpload({ createParentPath: true })); // Converts file uploads
app.use(cookieParser()); // Parses request headers and parses the cookies
app.use(
  expressSession({
    secret: "keep it secret, keep it safe.",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes are registered here
app.use("/", require("./controllers/home"));
app.use("/users", require("./controllers/users"));
app.use("/sessions", require("./controllers/sessions"));
app.use("/images", require("./controllers/images"));

// Start the server on port 3000
app.listen(3000, () => {
  console.log(`Social network app is now listening on http://localhost:3000`);
});
