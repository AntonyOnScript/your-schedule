const express = require('express')
const router = express.Router()

const Home = require('./controllers/Home')
const Contact = require('./controllers/Contact')
const Login = require('./controllers/Login')

const { checkUser } = require('./middlewares/global')

router.get('/', checkUser, Home.index)

router.get('/login', Login.index)
router.post('/login', Login.login)

router.get('/logout', checkUser,Login.logout)
router.post('/sign-up', Login.signUp)

router.get('/contact', checkUser, Contact.index)
router.post('/contact', checkUser, Contact.register)

router.get('/contact/:id', checkUser,Contact.loadContactById)
router.post('/contact/update/:id', checkUser,Contact.editContactById)

module.exports = router