import userService from '../services/user.service.js';
import taskService from '../services/task.service.js';
import { createUserSchema } from '../validators/user.validator.js';
import apiResponse from '../utils/apiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError.js';

const createUser = catchAsync(async (req, res) => {
    const validation = createUserSchema.safeParse(req.body || {});
    if (!validation.success) {
        const errorMessages = validation.error.issues.map((issue) => issue.message).join(', ');
        throw new ApiError(StatusCodes.BAD_REQUEST, errorMessages);
    }
    const user = await userService.createUser(req.body);
    return apiResponse(res, StatusCodes.CREATED, user, 'User created successfully');
});

const getUsers = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await userService.getUsers(page, limit);
    return apiResponse(res, StatusCodes.OK, result, 'Users retrieved successfully');
});

const getUserTasks = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tasks = await taskService.getTasksByUserId(id);
    return apiResponse(res, StatusCodes.OK, tasks, 'User tasks retrieved successfully');
});

export default {
    createUser,
    getUsers,
    getUserTasks
};
