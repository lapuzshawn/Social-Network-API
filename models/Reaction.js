const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// models/Reaction.js
//Reaction (SCHEMA ONLY)
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: { //Use Mongoose's ObjectId data type & Default value is set to a new ObjectId

    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: { //Sring/ Required/ 280 character maximum
    type: String,
    required: true,
    maxlength: 280,
  },
  username: { //Required
    type: String,
    required: true,
  },
  createdAt: { //Set default value to the current timestamp & Use a getter method to format the timestamp on query
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
