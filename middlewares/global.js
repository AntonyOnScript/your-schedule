exports.global = (request, response, next) => {

    response.locals.errors = request.flash('errors')
    response.locals.success = request.flash('success')
    response.locals.user = request.session.user

    next()

}

exports.csrfCheck = (err, request, response, next) => {

    if(err) {
        response.send(err)
    }

    next()

}

exports.csrfToken = (request, response, next) => {

    response.locals.csrfToken = request.csrfToken()

    next()

}

exports.checkUser = (request, response, next) => {

    if(request.session.user) {
        next()
        return
    }

    request.flash('errors', 'You must be logged')
    request.session.save(() => {
        return response.redirect(process.env.url+'/login')
    })

}