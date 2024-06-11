const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./routers/routes");
app.use("/", router);

app.listen(PORT, function () {
  console.log("listening on port " + PORT);
});
