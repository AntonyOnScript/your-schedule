const Login = require('../models/Login')

exports.index = (request, response) => {
    response.render('login')
}

exports.login = (request, response) => {
    response.render('login')
}

exports.signUp = async (request, response) => {

    try {

        const user = new Login(request.body)
        await user.signUp()

        if(user.errors.length > 0) {
            request.flash('errors', users.errors)
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