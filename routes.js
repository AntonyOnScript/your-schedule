const express = require('express')
const router = express.Router()

const Home = require('./controllers/Home')
const Contact = require('./controllers/Contact')
const Login = require('./controllers/Login')

router.get('/', Home.index)
router.get('/login', Login.index)
router.post('/login', Login.login)
router.post('/sign-up', Login.signUp)
router.get('/', Contact.index)
router.get('/contact', Contact.index)
router.post('/contact', Contact.register)
router.get('/contact/:id', Contact.loadContactById)
router.post('/contact/update/:id', Contact.editContactById)

module.exports = router