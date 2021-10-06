const Contact = require('../models/Contact')

exports.index = async (request, response) => {

    const contacts = await Contact.loadAllContacts()
    response.render('index', { contacts })

}