const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/chatbot', require('./routes/chatbot'));

// Serve static files from the public directory
app.use(express.static('public'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port 'http://localhost:${process.env.PORT}'`);
});