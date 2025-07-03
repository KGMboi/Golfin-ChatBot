// deleteDocs.js
const mongoose = require('mongoose');
const Knowledge = require('../models/knowledge');

// Edit this array to delete by question or tag
const questionsToDelete = [
  'What is Node.js?'
];
const tagsToDelete = [
  'nodejs', 'javascript'
];

async function run() {
  await mongoose.connect('mongodb://localhost:27017/helpChatbot');

  // Delete by question
  if (questionsToDelete.length > 0) {
    const qResult = await Knowledge.deleteMany({ question: { $in: questionsToDelete } });
    console.log(`Deleted by question: ${qResult.deletedCount}`);
  }

  // Delete by tag
  if (tagsToDelete.length > 0) {
    const tResult = await Knowledge.deleteMany({ tags: { $in: tagsToDelete } });
    console.log(`Deleted by tag: ${tResult.deletedCount}`);
  }

  await mongoose.disconnect();
  console.log('Done!');
}

run().catch(err => { console.error(err); process.exit(1); });
