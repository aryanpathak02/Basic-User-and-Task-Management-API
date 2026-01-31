import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id/tasks', userController.getUserTasks);

export default router;
