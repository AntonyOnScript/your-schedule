const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    telephone: String,
    description: String
})

const contactModel = mongoose.model('contacts', contactSchema)

class Contact {

    constructor(body) {
        this.body = body
        this.contact = null
    }

    async register() {

        this.contact = await contactModel.create(this.body)

    }

    async contactEdit(id) {

        this.contact = await contactModel.findByIdAndUpdate(id, this.body, {new: true})

    }

    static async contactDelete(id) {

        const contact = await contactModel.findByIdAndDelete(id, {new: true})
        return contact

    }

    static async loadById(id) {

        const contact = contactModel.findById(id)
        return contact

    }

}

module.exports = Contact