const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'the username must be required'],
      unique: [true, 'the username must be unique'],
      min: [8, 'you must add username at least of 8 characters'],
    },
    firstName: {
      type: String,
      required: [true, 'the firstname must be required'],
      min: [3, 'you must add firstname at least of 3 characters'],
      max: [15, 'you must add firstname at most of 15 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'the lastname must be required'],
      min: [3, 'you must add lastname at least of 3 characters'],
      max: [15, 'you must add lastname at most of 15 characters'],
    },
    password: {
      type: String,
      required: [true, 'the password must be required'],
      min: [5, 'you must add password at least of 5 characters'],
      max: [10, 'you must add password at most of 10 characters'],
    },
    dob: Date,
  },
  { timestamps: true },
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
