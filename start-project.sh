#!/bin/bash

# Function to stop all background processes when the script exits
cleanup() {
    echo "Stopping front & back end processes..."
    pkill -P $$
    wait $BACKEND_PID
    wait $FRONTEND_PID
    echo "Shutting down iOS Simulator..."
    xcrun simctl shutdown all
    exit
}

# Set up the cleanup function to run when the script exits
trap cleanup EXIT

# Create database if it doesn't exist
echo "Checking and creating database if necessary..."
psql -lqt | cut -d \| -f 1 | grep -qw database_development
if [ $? -ne 0 ]; then
    createdb database_development
    echo "Database 'database_development' created."
else
    echo "Database 'database_development' already exists."
fi

# Start the backend
echo "Starting backend..."
cd backend
node index.js &

# Capture the backend process ID
BACKEND_PID=$!


# Start the frontend React Native packager
echo "Starting frontend..."
echo "Starting React Native packager..."
cd ../frontend
npx react-native start &

# Capture the frontend process ID
FRONTEND_PID=$!

# Wait a bit for the backend & packager to start
sleep 5

# Start the IOS simulator
echo "Starting IOS simulator..."
npx react-native run-ios --no-packager &

# Wait for user input
echo "Press Ctrl+C to stop all processes and exit"
wait