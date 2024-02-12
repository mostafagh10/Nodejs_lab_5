const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: [5, 'you must add title at least of 5 characters'],
      max: [20, 'you must add title at most of 20 characters'],
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    tags: {
      type: [String],
      validate: {
        validator(tags) {
          return tags.every((tag) => tag.length <= 10);
        },
        message: () => 'Each tag must be at most 10 characters long',
      },
    },
    userId: String,
  },
  { timestamps: true },
);

const todoModel = mongoose.model('Todo', todoSchema);
module.exports = todoModel;
