const express = require("express");
const router = express.Router();

const generator = require("../modals/card")

router.post('/', (req, res) => {
  generator.generateCard(req, res);
});

module.exports = router;