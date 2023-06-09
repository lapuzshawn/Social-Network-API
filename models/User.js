// models/User.js
const mongoose = require('mongoose');
const Thought = require('./Thought')

const userSchema = new mongoose.Schema({
  username: { // needs to be unique/required/trimmed
    type: String,
    unique: true, 
    required: true,
    trim: true,
  },
  email: { // needs to be unique/required/trimmed & Mongoose's matching validation
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 
    'Please use a valid email'],
  },
  thoughts: [{ //Array of _id values referencing the Thought model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  friends: [{ //Array of _id values referencing the User model (self-reference)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Virtual for user's friends count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
