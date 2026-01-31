import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({ required_error: 'Title is required', invalid_type_error: 'Title is required' })
        .min(1, 'Title cannot be empty'),
    userId: z.string({ required_error: 'User ID is required', invalid_type_error: 'User ID is required' })
        .min(1, 'User ID cannot be empty'),
    completed: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
    completed: z.boolean({ required_error: 'Completed status is required' }),
});
