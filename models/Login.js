const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const loginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const loginModel = mongoose.model('users', loginSchema)

class Login {

    constructor(body) {
        this.body = body
        this.errors = []
        this.login = null
    }

    async logIn() {

        this.checkBody()

        if(this.errors.length > 0) return

        this.login = await loginModel.findOne({ email: this.body.email })

        if(!this.login) {
            this.errors.push('Email not found')
            return
        }

        if(!bcrypt.compareSync(this.body.password, this.login.password)) {
            this.errors.push('Incorrect password')
            return
        }

    }

    async signUp() {

        this.checkBody()

        if(this.errors.length > 0) return

        const salt = bcrypt.genSaltSync(10)
        this.body.password = bcrypt.hashSync(this.body.password, salt)

        this.login = await loginModel.create(this.body)

        console.log(this.login)

    }

    checkBody() {

        for(let i in this.body) {
            if(typeof this.body[i] !== 'string') {
                this.errors.push('Please fill the fields correctly')
            }
        }

    }

}

module.exports = Login