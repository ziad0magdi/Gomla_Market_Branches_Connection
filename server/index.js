const express = require("express");
const db = require("./Config/db");
const flash = require("connect-flash");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

env.config();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());

const allowedPattern =
  /^http:\/\/(localhost|10\.d{1,3}\.\d{1,3}\.\d{1,3}):\d+$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

let PORT = process.env.PORT;

const routesPath = path.join(__dirname, "./routes");
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(path.join(routesPath, file));
    app.use("/", route);
  }
});

app.use(express.static(path.join(__dirname, "../client/build")));

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Worker running at http://0.0.0.0:${PORT}`);
});
