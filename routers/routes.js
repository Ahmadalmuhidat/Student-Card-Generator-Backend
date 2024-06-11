const express = require("express");
const router = express.Router();

const generator = require("../modals/card")

router.post('/generate', (req, res) => {
  generator.generateCard(req, res);
});

router.get('/', (req, res) => {
  res.send("hello world");
});

module.exports = router;