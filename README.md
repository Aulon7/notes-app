# Notes App

A full-stack notes application built with React, TypeScript, and Node.js.
Deployed on Render: https://notes-app-frontend-da8a.onrender.com/

## Features

- User authentication (register/login)
- Create, read, update, and delete notes
- Secure password hashing
- JWT authentication
- MongoDB database
- TypeScript support

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
# Install backend dependencies
cd notes-app-backend
npm install

# Install frontend dependencies
cd ../notes-app-frontend
npm install
```

3. Set up MongoDB
- Make sure MongoDB is running locally on port 27017
- Or update the connection string in `notes-app-backend/dababase/index.ts`

4. Start the development servers
```bash
# Start backend server
cd notes-app-backend
npm run dev

# Start frontend server
cd ../notes-app-frontend
npm run dev
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Notes
- POST `/api/note/add` - Create a new note
- GET `/api/note` - Get all notes
- PUT `/api/note/:id` - Update a note
- DELETE `/api/note/:id` - Delete a note
