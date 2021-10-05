const express = require('express')
const router = express.Router()

const Home = require('./controllers/Home')
const Contact = require('./controllers/Contact')
const Login = require('./controllers/Login')

router.get('/', Home.index)
router.get('/login', Login.index)
router.post('/login', Login.login)
router.post('/sign-up', Login.signUp)

module.exports = router