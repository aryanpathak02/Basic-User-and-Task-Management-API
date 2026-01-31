import User from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import { StatusCodes } from 'http-status-codes';

const createUser = async (userData) => {
    if (await User.findOne({ email: userData.email })) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken');
    }
    return await User.create(userData);
};

const getUsers = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();

    return {
        users,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
}

export default {
    createUser,
    getUsers,
    getUserById
};
