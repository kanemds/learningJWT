const mongoose = require('mongoose')


// npm i validator library
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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

// can be 'remove'
// do something before data is saved
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// UserSchema.post('save', function(next)){} is doing something after data is saved

// login
UserSchema.statics.login = async function (email, password) {
  // this === instance model 
  const user = await this.findOne({ email })
  if (user) {
    // compare the password that comes in with the exist password from user.password
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect password')
  }
  throw Error('Incorrect email')
}




// must singular
const User = mongoose.model('user', UserSchema)

module.exports = User