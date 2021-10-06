const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    userId: {type: String, required: true},
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

    static async loadAllContacts() {

        const contacts = await contactModel.find()
        return contacts

    }

}

module.exports = Contact