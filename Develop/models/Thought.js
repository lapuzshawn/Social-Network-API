const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// models/Thought.js
const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date, //Date 
    default: Date.now, // Set default to current time
    get: (timestamp) => dateFormat(timestamp), // Get the timestamp
  },
  username: {
    type: String, //
    required: true, //required
  },
  reactions: [Reaction.schema], // Array of nested Reaction schema
},
{
  toJSON: {
    getters: true, 
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
