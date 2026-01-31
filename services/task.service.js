import Task from '../models/task.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import { StatusCodes } from 'http-status-codes';

const createTask = async (taskData) => {
    const userExists = await User.findById(taskData.userId);
    if (!userExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User does not exist');
    }
    return await Task.create(taskData);
};

const getTasks = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const tasks = await Task.find().populate('userId', 'name').skip(skip).limit(limit);
    const total = await Task.countDocuments();

    return {
        tasks,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getTasksByUserId = async (userId) => {
    // Verify user exists first
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }
    return await Task.find({ userId });
};

const updateTask = async (taskId, updateData) => {
    const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    if (!task) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
    }
    return task;
};

const deleteTask = async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
    }
    return task;
};

export default {
    createTask,
    getTasks,
    getTasksByUserId,
    updateTask,
    deleteTask,
};
