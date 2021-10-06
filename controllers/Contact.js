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

    if(contact.userId === request.session.user._id) {

        if(contact) {
            return response.render('contact', {
                contact: contact
            })
        }

        return
    }

    request.flash('errors', 'You must be logged')
    request.session.save(() => {
        return response.redirect(process.env.url+'/login')
    })

}

exports.editContactById = async (request, response) => {

    const contact = new Contact(request.body)
    await contact.contactEdit(request.params.id)

    request.flash('success', 'Contact was edited')
    request.session.save(function () {
        return response.redirect(process.env.url+'/contact/'+contact.contact._id)
    })

}