const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
        type: String,
        required: true
      }
});

module.exports = Post = mongoose.model('task', TaskSchema);
