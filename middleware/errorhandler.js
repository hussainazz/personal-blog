let errorHandler = (error, req, res, next) => {
    let statusCode = error.status || 500
    res.status(statusCode).send(error.message)
    if(statusCode == 500) {
        console.error(`something went wrong: ${error.message}`)
    }
}

export default errorHandler