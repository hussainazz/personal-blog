let notFound = (req, res, next) => {
    let error = new Error(`Not found.`)
    error.status = 404
    next(error)
}

export default notFound