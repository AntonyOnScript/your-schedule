const Contact = require('../models/Contact')

exports.index = (request, response) => {
    response.render('contact', {
        contact: {}
    })
}

exports.register = async (request, response) => {

    try {

        const contact = new Contact(request.body)
        await contact.register()

        request.flash('success', 'Contact was registred successfully')
        request.session.save(() => {
            return response.redirect(process.env.url+'/contact/'+contact.contact._id)
        })

    } catch(e) {

        console.log(e)

    }

}

exports.loadContactById = async (request, response) => {

    const contact = await Contact.loadById(request.params.id)

    if(contact) {
        return response.render('contact', {
            contact: contact
        })
    }

}