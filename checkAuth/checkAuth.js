const jwt = require('jsonwebtoken')
require('dotenv').config()

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

module.exports = { requireAuth }