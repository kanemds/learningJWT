const User = require('../models/User')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const handleErrors = (error) => {
  console.log(error.message, error.code)
  let err = { email: '', password: '' }

  if (error.message === 'Incorrect email') {
    err.email = 'Email is not registerd'
  }
  if (error.message === 'Incorrect password') {
    err.password = 'Password is invalid'
  }

  //this if from mongodb
  if (error.code === 11000) {
    err.email = 'that email is already registered'
    return err
  }

  if (error.message.includes('user validation failed')) {
    const values = Object.values(error.errors)
    for (const value of values) {
      let properties = value.properties
      err[properties.path] = properties.message
    }
  }
  return err
}

//  3 days
const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.singup_get = (req, res) => {
  res.render('signup')
}
module.exports.login_get = (req, res) => {
  res.render('login')
}
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({ errors })
  }
}

module.exports.logout_get = (req, res) => {
  // instead of delete replace a new jwt then redirect
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}