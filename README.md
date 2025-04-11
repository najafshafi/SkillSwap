# SkillSwap Learning Platform

A comprehensive online platform for skill-based courses, connecting learners with instructors across various domains including design, development, cybersecurity, and marketing.

## Project Overview

SkillSwap is a full-stack web application that enables users to:

- Browse and enroll in various courses
- Learn from specialized instructors
- Track learning progress
- Manage user profiles and enrolled courses
- Process payments for course enrollment

## Tech Stack

### Frontend

- React.js (v19.0.0)
- React Router for navigation
- Bootstrap and React Bootstrap for UI components
- Firebase for auth integration
- Axios for API communication
- FullCalendar for scheduling

### Backend

- Node.js with Express
- MongoDB with Mongoose for database
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## Project Structure

```
project/
├── frontend/           # React application
│   ├── public/         # Static files
│   └── src/
│       ├── api/        # API client code
│       ├── assets/     # Images and other assets
│       ├── components/ # Reusable UI components
│       ├── context/    # Context providers
│       ├── pages/      # Application pages
│       ├── routes/     # Route definitions
│       ├── styles/     # CSS files
│       └── utils/      # Utility functions
│
└── backend/            # Express server
    ├── config/         # Configuration files
    ├── controllers/    # Request handlers
    ├── db/             # Database connection
    ├── middleware/     # Express middleware
    ├── models/         # Mongoose models
    ├── public/         # Publicly accessible files
    └── routes/         # API routes
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/skillswap.git
   cd skillswap
   ```

2. Set up the backend

   ```
   cd backend
   npm install
   cp .env.example .env  # Create and configure your environment variables
   ```

3. Set up the frontend
   ```
   cd ../frontend
   npm install
   cp .env.example .env  # Create and configure your environment variables
   ```

### Running the Application

1. Start the backend server

   ```
   cd backend
   npm start
   ```

2. Start the frontend development server

   ```
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## Features

- **User Authentication**: Signup, login, and profile management
- **Course Catalog**: Browse available courses by category
- **Course Enrollment**: Enroll in courses with payment processing
- **Learning Dashboard**: Track progress in enrolled courses
- **Admin Panel**: Add and manage courses (admin users only)

## Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 5001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `CORS_ORIGIN` - Allowed origins for CORS
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_FIREBASE_CONFIG` - Firebase configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
