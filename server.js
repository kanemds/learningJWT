const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const PORT = 3000

app.use(express.static('public'))

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

app.get('/', (req, res) => res.render('home'))
app.get('/coffee', (req, res) => res.render('coffee')
)

