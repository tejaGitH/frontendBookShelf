#!/bin/bash


echo "ensure the ports "3000,3002" are availble"



# Clone and set up the backend
echo "Cloning backend repository..."
git clone https://github.com/tejaGitH/bookShelf.git
cd bookShelf || exit
echo "Installing backend dependencies..."
npm install --save
echo "Starting backend server with nodemon..."
nodemon server.js &
cd ..

# Clone and set up the frontend
echo "Cloning frontend repository..."
git clone https://github.com/tejaGitH/frontendBookShelf.git
cd frontendBookShelf || exit
echo "Installing frontend dependencies..."
npm install --save
cd src || exit
echo "Starting frontend on PORT 3002..."
PORT=3002 npm start


