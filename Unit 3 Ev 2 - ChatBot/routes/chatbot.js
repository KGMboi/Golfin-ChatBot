// routes/chatbot.js
const express = require('express');
const router = express.Router();
const Knowledge = require('../models/knowledge');

router.post('/', async (req, res) => {
  const { message } = req.body;

  // Try to find a matching question using the regex expression
  const result = await Knowledge.findOne({
    question: { $regex: message, $options: 'i' }
  });

  if (result) {
    res.json({ reply: result.answer });
  } else {
    res.json({ reply: "Sorry, I couldn't find an answer to that." });
  }
});

module.exports = router;