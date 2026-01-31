import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';

// Load env vars
dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
