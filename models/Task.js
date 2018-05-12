const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: true,
  versionKey: false
}


// Create Schema
const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  subTasks: {
    type: []
  },
  boardId: {
    type: Schema.Types.ObjectId
  }
}, schemaOptions);

module.exports = Post = mongoose.model('task', TaskSchema);
