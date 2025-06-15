#!/bin/sh

# Start backend in background
echo "Starting backend..."
npm run start --workspace=@intervume/server-api &

# Start frontend 
echo "Starting frontend..."
npm run start --workspace=@intervume/ui-core &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $? 