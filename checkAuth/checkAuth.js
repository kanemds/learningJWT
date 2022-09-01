const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.log(error.message)
        res.redirect('/login')
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
      if (error) {
        console.log(error.message)
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken)
        let user = await User.findById(decodedToken.id)
        // store exist user to locals
        res.locals.user = user
        next()
      }
    })
  }
  else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkUser }