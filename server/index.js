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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedPattern =
        /^http:\/\/(localhost|10\.110\.\d{1,3}\.\d{1,3}):3001$/;

      if (allowedPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
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

// Start the server
app.listen(PORT, () => {
  console.log(`Worker running at http://localhost:${PORT}`);
});
