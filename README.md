# Basic User and Task Management API

A basic REST API for managing users and tasks, built with Node.js, Express, and MongoDB.

## Features

- **User Management**: Create users, list users (pagination), view user tasks.
- **Task Management**: Create tasks, list tasks (pagination), mark as completed, delete tasks.
- **Validations**: Uses Zod for input validation.
- **Security**: Uses Helmet for setting HTTP headers.
- **Clean Architecture**: Separation of concerns (Controllers, Services, Models, Routes).

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Review the `.env` file. The default configuration is:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/user-task-db
    NODE_ENV=development
    ```
    Make sure you have MongoDB running locally or update the URI.

3.  **Run the Server**
    ```bash
    npm start
    # or for development with nodemon (if installed)
    # npm run dev 
    # (Note: you might need to add a nodemon script to package.json)
    ```

    To run with standard node:
    ```bash
    node index.js
    ```

## API Endpoints

### Users

- `POST /users`: Create a new user.
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`
- `GET /users?page=1&limit=10`: Get all users with pagination.
- `GET /users/:id/tasks`: Get all tasks for a specific user.

### Tasks

- `POST /tasks`: Create a new task.
  - Body: `{ "title": "Buy groceries", "userId": "YOUR_USER_ID" }`
- `GET /tasks?page=1&limit=10`: Get all tasks with pagination.
- `PATCH /tasks/:id`: Mark a task as completed (or not).
  - Body: `{ "completed": true }`
- `DELETE /tasks/:id`: Delete a task.

## Assumptions & Design Validations

- **Authentication**: Intentionally excluded as per requirements.
- **Rate Limiting**: Intentionally excluded as per requirements.
- **Date Handling**: Standard MongoDB timestamps are used but hidden in responses.
- **IDs**: MongoDB `_id` is transformed to `id` in JSON responses.

