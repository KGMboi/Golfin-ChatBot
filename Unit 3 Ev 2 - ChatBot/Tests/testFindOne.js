// testFindOne.js
const mongoose = require('mongoose');
const Knowledge = require('../models/knowledge');

mongoose.connect('mongodb://localhost:27017/helpChatbot')
  .then(async () => {
    const result = await Knowledge.find();
    console.log(result);
    mongoose.disconnect();
  });