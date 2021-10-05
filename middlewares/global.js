exports.global = (request, response, next) => {

    response.locals.errors = request.flash('errors')
    response.locals.success = request.flash('success')

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