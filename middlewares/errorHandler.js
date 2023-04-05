const APIErrorHandler = (error, req, res, next) => {
    res.json({error: error.message})
}

export default APIErrorHandler;