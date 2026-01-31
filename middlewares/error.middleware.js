import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (!statusCode) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = StatusCodes.BAD_REQUEST;
        message = 'Duplicate field value entered';
    }

    // Handle Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    res.status(statusCode).json({
        success: false,
        message: message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;
