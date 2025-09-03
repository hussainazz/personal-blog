let errorHandler = (err, req, res, next) => {
    if(err.status) {
        res.status(err.status).send(err.message )
    } else {
        res.status(500).json(err.message)
    }
}

export default errorHandler