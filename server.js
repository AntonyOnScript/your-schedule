require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
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

app.on('ok', () => {
    app.listen(PORT, () => console.log('app ok'))
})