// models/Knowledge.js
const mongoose = require('mongoose');

const KnowledgeSchema = new mongoose.Schema({
  question: String,
  answer: String,
  tags: [String]
});

module.exports = mongoose.model('Knowledge', KnowledgeSchema);