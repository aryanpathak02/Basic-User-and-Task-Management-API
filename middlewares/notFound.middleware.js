import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError.js';

const notFound = (req, res, next) => {
    const error = new ApiError(StatusCodes.NOT_FOUND, `Not Found - ${req.originalUrl}`);
    next(error);
};

export default notFound;
