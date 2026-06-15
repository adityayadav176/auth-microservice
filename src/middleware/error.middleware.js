const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
};

export { errorHandler };