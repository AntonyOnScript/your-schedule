const Contact = require('../models/Contact')

exports.index = async (request, response) => {

    const contacts = await Contact.loadAllContacts()
    
    const clientContacts = []

    for(let i in contacts) {

        let currentContact = contacts[i]
        let currentContactUserId = currentContact.userId

        if(request.session.user._id === currentContactUserId) {
            clientContacts.push(currentContact)
        }

    }

    response.render('index', { contacts: clientContacts })

}