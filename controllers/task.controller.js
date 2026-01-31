import taskService from '../services/task.service.js';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator.js';
import apiResponse from '../utils/apiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError.js';

const createTask = catchAsync(async (req, res) => {
    const validation = createTaskSchema.safeParse(req.body || {});
    if (!validation.success) {
        const errorMessages = validation.error.issues.map((issue) => issue.message).join(', ');
        throw new ApiError(StatusCodes.BAD_REQUEST, errorMessages);
    }
    const task = await taskService.createTask(req.body);
    return apiResponse(res, StatusCodes.CREATED, task, 'Task created successfully');
});

const getTasks = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await taskService.getTasks(page, limit);
    return apiResponse(res, StatusCodes.OK, result, 'Tasks retrieved successfully');
});

const updateTask = catchAsync(async (req, res) => {
    const validation = updateTaskSchema.safeParse(req.body || {});
    if (!validation.success) {
        const errorMessages = validation.error.issues.map((issue) => issue.message).join(', ');
        throw new ApiError(StatusCodes.BAD_REQUEST, errorMessages);
    }
    const task = await taskService.updateTask(req.params.id, req.body);
    return apiResponse(res, StatusCodes.OK, task, 'Task updated successfully');
});

const deleteTask = catchAsync(async (req, res) => {
    await taskService.deleteTask(req.params.id);
    return apiResponse(res, StatusCodes.OK, null, 'Task deleted successfully');
});

export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
