# SCPMA 
### (Simple Cross-Platform Mobile Application)

SCPMA is a lightweight, efficient mobile application demonstrating the integration of modern web technologies for cross-platform development. This project showcases:

- **Frontend**: React Native for building a responsive and native-like mobile interface
- **Backend**: Node.js with Express.js, creating a robust RESTful API
- **Database**: PostgreSQL for reliable and scalable data storage

The application allows users to manage a list of items, demonstrating basic CRUD (Create, Read, Update, Delete) operations in a mobile environment.

## Prerequisites

- Node.js
- npm
- PostgreSQL
- For iOS development: macOS, Xcode

Note: Ensure PostgreSQL is installed and its service is running before proceeding.

## Getting Started

1. Clone this repository
2. Navigate to the project root directory
3. Run the following code to install dependencies for both backend and frontend:

   ```bash
   cd backend && npm install && cd ../frontend && npm install && cd ..
   ```

   Alternatively, you can run these steps manually:

   ```bash
   # Install backend dependencies
   cd backend
   npm install
   cd ..

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

4. Run Script to start the project:

   ```bash
   ./start-project.sh
   ```

The script will automatically:

- Create the PostgreSQL database if it doesn't exist
- Start the backend server
- Launch the iOS app simulator

## Project Structure

- `backend/`: Contains the Node.js backend project
- `frontend/`: Contains the React Native frontend project
- `start-project.sh`: Shell script to start both backend and frontend

## Notes

- This project is currently set up for iOS development only.
- Ensure your PostgreSQL service is running before starting the application.
- To stop all processes, press `Ctrl+C` in the terminal where you ran the start script.
