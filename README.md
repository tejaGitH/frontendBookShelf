# Bookshelf

## Project Overview
Bookshelf is an  social networking application designed for book lovers, enabling users to create and manage their own book collections while connecting with friends. This platform fosters a community of readers, allowing them to share their reading experiences and discover new books through social interactions.

## Key Features

- **User Authentication**: Secure sign-up and login using JWT (JSON Web Token) for authentication, ensuring safe user sessions.
  
- **Dynamic Dashboard**: Users can view their reading progress, including sections for currently reading and finished books, and have the ability to add new books and check social updates from friends.

- **Book Management**: Search for books using a third-party API, manage collections by marking books as currently reading or finished, and update reading progress.

- **Friendship Management**: Send friend requests, view pending requests, and manage friendships. Users can fetch all available friends and see real-time updates.

- **Social Interaction**: Display updates, reviews, and ratings from friends in social cards on the user's dashboard, fostering community engagement.

## Technologies Used

- **Frontend**: React.js for building the user interface.
- **Backend**: Node.js with Express for server-side logic.
- **Database**: MongoDB for data storage.
- **State Management**: Redux Toolkit for managing application state.
- **API Integration**: Axios for handling HTTP requests.
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication.



# Checkout and Start the Development Server

Follow these steps to set up and run the development server:

1. **Copy the Script**  
   Copy the `bookShelf.sh` file from the `bookShelfRoot` / `bookShelf`  / `frontendBookShelf` repository.

2. **Save the Script**  
   Save the file with the name `bookShelf.sh` ( desired name).

3. **Make the Script Executable**  
   Run the following command in your terminal to grant execute permissions:  
   ```

   chmod +x bookShelf.sh
    
4. **Run the Script**
    Execute the script to start the serve
    ```

    ./bookShelf.sh
    
    
5. **Access the Server**
    Once the Script complete, you can access bookShelf at <b>http://localhost:3002</b> ....!  

## Installation

### Backend
1. Clone the repository:
    ```
    git clone https://github.com/tejaGitH/bookShelf.git 
    ```
2. Navigate to the backend directory:
    ```
    cd bookshelf
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Set up environment variables in a `.env` file:
    ```
    MONGO_URI='your_mongo_uri'
    SECRET_KEY='your_secret_key'
    NYT_API_KEY='your_nyt_api_key'
    NYT_API_SECRET='your_nyt_api_secret'
    ```
5. Start the backend server:
    ```
    node server.js
    ```

### Frontend
1. Clone the repository:
    ```
    git clone https://github.com/tejaGitH/frontendBookShelf.git 
    ```
2. Navigate to the frontend directory:
    ```
    cd frontendBookShelf
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Start the frontend server:
    ```
    PORT=3002 npm start 
    ```

## Usage

1. Open your browser and go to `http://localhost:3002` for the frontend and `http://localhost:3000` for the backend.
2. Sign up or log in using your email ID and password.
3. Explore the My Bookshelf section to search, add, and review books.
4. Check your Dashboard for currently reading books, update progress, and view social cards with friends' updates.

## Project Structure

### Backend Structure

### Backend
```plaintext

backend/
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   ├── reviewController.js
│   └── friendshipController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   ├── ReadingProgress.js
│   ├── Review.js
│   └── Friendship.js
├── routes/
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   ├── reviewRoutes.js
│   └── friendshipRoutes.js
├── middlewares/
│   ├── api.js
│   └── verifyToken.js
├── .env
├── server.js
└── package.json

frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── actions/
│   │   ├── bookActions.js
│   │   ├── reviewActions.js
│   │   ├── friendshipActions.js
│   │   └── userActions.js
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── common/
│   │   │   ├──ErrorBoundary.jsx
│   │   │   └──PrivateRoute.jsx
│   │   ├── NavBar/
│   │   │   ├──MyBooks
│   │   │   │   ├──MyBooks.jsx
│   │   │   │   ├──BestSellers.jsx
│   │   │   │   ├──AddBook.jsx
│   │   │   │   ├──UserBooks.jsx
│   │   │   │   ├──CurrentBooks.jsx
│   │   │   │   └──FinishedBooks.jsx
│   │   │   ├──MyFriends
│   │   │   │   ├──MyFriends.jsx
│   │   │   │   ├──EligibleUsers.jsx
│   │   │   │   ├──FriendRequests.jsx
│   │   │   │   ├──FriendsList.jsx
│   │   │   │   └──FriendUpdates.jsx
│   │   │   └──SocialUpdates
│   │   │       ├──SocialUpdatesPage.jsx
│   │   │       ├──Books.jsx
│   │   │       └──SocialUpdates.jsx
│   │   │   
│   │   └── Dashboard/
│   │       ├──Dashboard.jsx
│   │       ├──MyProgress
│   │       │   ├──MyProgress.jsx
│   │       │   ├──DashBoardCurrentBooks.jsx
│   │       │   └──DashboardFinishedBooks.jsx 
│   │       ├──DashboardAddBook
│   │       │   └──DashboardAddBook.jsx
│   │       ├──DashboardFriendList
│   │       │   └──DashboardFriendList.jsx
│   │       └──DashBoardSocialUpdates
│   │           └──SocialUpdates.jsx
│   ├── reducers/
│   │   ├── bookReducers.js
│   │   ├── reviewReducers.js
│   │   ├── friendshipReducers.js
│   │   └── userReducers.js
│   ├── utils/
│   │   ├── Store.js
│   │   ├── axiosInstance.js
│   │   └── createApiAction.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .env
└── package.json


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Bookshelf is designed to create a vibrant community of readers who can share their journeys and recommendations in a friendly environment. Join us in building a platform that celebrates literature!
