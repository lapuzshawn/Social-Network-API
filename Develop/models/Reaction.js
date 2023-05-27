const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// models/Reaction.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
},
{
  toJSON: {
    getters: true,
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
