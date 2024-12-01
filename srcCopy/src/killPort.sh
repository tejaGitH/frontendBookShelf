#!/bin/bash

# Check if the port number is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <port>"
  exit 1
fi

PORT=$1

# Find the PID of the process using the specified port
PID=$(lsof -t -i tcp:$PORT)

# Check if a PID was found
if [ -z "$PID" ]; then
  echo "No process found running on port $PORT"
  exit 1
fi

# Kill the process
kill -9 $PID

echo "Killed process $PID running on port $PORT"

