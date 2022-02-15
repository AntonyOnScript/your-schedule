const Login = require('../models/Login')

exports.index = (request, response) => {
    response.render('login')
}

exports.login = async (request, response) => {

    try {

        const user = new Login(request.body)
        await user.logIn()
        request.session.user = null

        if(user.errors.length > 0) {
            request.flash('errors', user.errors)
            request.session.save(function () {
                return response.redirect(process.env.url+'/login')
            })
            return
        }

        request.session.user = user.login
        request.flash('success', 'Loged Successfully')
        request.session.save(function () {
            return response.redirect(process.env.url+'/')
        })

    } catch (e) {
        console.log(e)
    }

}

exports.signUp = async (request, response) => {

    try {

        const user = new Login(request.body)
        await user.signUp()

        if(user.errors.length > 0) {
            request.flash('errors', user.errors)
            request.session.save(function () {
                return response.redirect(process.env.url+'/login')
            })
            return
        }

        request.flash('success', 'Registred Successfully')
        request.session.save(function () {
            return response.redirect(process.env.url+'/login')
        })

    } catch (e) {
        console.log(e)
    }

}

exports.logout = (request, response) => {

    request.session.regenerate(() => {
        request.flash('success', "You has left")
        return response.redirect(process.env.url+'/login')
    })

}