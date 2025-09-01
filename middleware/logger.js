import color from "colors"

let logger = (req, res, next) => {
    const httpMethods = {
    'GET': 'green',
    'POST': 'blue',
    'PUT': 'yellow',
    'DELETE': 'red'
    }
    let color = httpMethods[req.method]
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[color])
    next()
}

export {logger}