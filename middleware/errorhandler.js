let errorHandler = (error, req, res, next) => {
    let statusCode = error.status || 500
    res.status(statusCode).write(error.message)
    
    if(statusCode == 500) {
        console.error(`something went wrong: ${error.message}`)
    }
}

export {errorHandler}