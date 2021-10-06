require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const { global, csrfCheck, csrfToken } = require('./middlewares/global')
const app = express()
const PORT = process.env.PORT || 8081

mongoose.connect(process.env.atlasUrl)
.then(() => {
    console.log('database: ok')
    app.emit('ok')
})
.catch((e) => {
    console.log(e)
})

const expressSession = require('express-session')
const mongoStore = require('connect-mongo')
const flash = require('connect-flash')
const csurf = require('csurf')
const {route} = require("express/lib/router");

const session = expressSession({
    secret: 'idunno',
    store: new mongoStore({mongoUrl: process.env.atlasUrl}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(session)
app.use(csurf())
app.use(flash())
app.use(global)
app.use(csrfToken)
app.use(csrfCheck)

app.use(routes)

app.on('ok', () => {
    app.listen(PORT, () => console.log('app ok'))
})