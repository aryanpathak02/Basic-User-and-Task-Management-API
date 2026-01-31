import express from 'express';
import taskController from '../controllers/task.controller.js';

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
