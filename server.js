const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./checkAuth/checkAuth')
const app = express()
const PORT = 3000

app.use(express.static('public'))

//  req.body will print info  
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

mongoose
  .connect(process.env.JWT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => {
      console.log('server connected')
    })
  })
  .catch(err => {
    console.log(err.message)
  })

// this will check every get request
app.get('*', checkUser)

app.get('/', (req, res) => res.render('home'))
app.get('/coffee', requireAuth, (req, res) => res.render('coffee'))
app.use(authRoutes)

// app.get('/set-cookie', (req, res) => {
//   res.cookie('newUser', false)
//   // should always set: secure: true
//   // not showing on frontend js: httpOnly: true
//   // with maxAge when refresh cookie still exist untill the maxAge
//   res.cookie('isUser', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
//   res.send('Got a cookie')
// })

// app.get('/read-cookie', (req, res) => {
//   const cookies = req.cookies
//   console.log(cookies)
//   res.json(cookies)
// })
