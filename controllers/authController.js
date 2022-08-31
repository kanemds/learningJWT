const User = require('../models/User')

module.exports.singup_get = (req, res) => {
  res.render('signup')
}
module.exports.login_get = (req, res) => {
  res.render('signup')
}
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(400).send('error, user not created')
  }
}
module.exports.login_post = (req, res) => {
  res.send('user login')
}