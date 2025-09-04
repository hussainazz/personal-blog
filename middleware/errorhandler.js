let errorHandler = (error, req, res, next) => {
    res.status(error.status).send(error.message);
};

export default errorHandler;
