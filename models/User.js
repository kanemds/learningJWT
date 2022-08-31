const mongoose = require('mongoose')

// npm i validator library
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an eamil'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimun password is 6 characters']
  }
})


// must singular
const User = mongoose.model('user', UserSchema)

module.exports = User