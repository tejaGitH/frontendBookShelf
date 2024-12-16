# Bookshelf

## Project Brief
Bookshelf is a mini social network project to book lovers, allowing users to create  books collection with friends

## Feature Set
The web-based application provides the following feature set:
- **User Accounts**: Sign up and login using credidentials created while Register.(authentication based on JWT)
- **Dashboard**: When logged in, users can see the MyProgress section with currentlyReading and Finished bookslist, option to add books, along with fetching friends and SocialUpdates.
- **My Books**: Search and fetch books using a third-party API ( NY Times Books API). A user can fetch all the books, along with CurrentlyReadind and Finished books, with option s to update markAs(Currently Reading, Finished) and in in currentBooks he can update progress.
- **My Friends**: Fetches all the available users to send requests, pending requests, and available friends.
  
- **Social Cards**: Display updates/reviews/ratings from friends in a social card format, visible on the user's dashboard. along with allt he books.

## Installation
### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/tejaGitH/bookShelf.git 
    ```
2. Navigate to the backend directory:
    ```bash
    cd bookshelf
    ```
3. Install dependencies:
    ```bash
    npm install --save
    ```
4. Set up environment variables. Create a `.env` file in the backend directory and add the required variables:
    ```plaintext
    MONGO_URI='mongodb+srv://navyateja:navyateja@cluster0.tkjaz.mongodb.net/bookShelf'
    SECRET_KEY='teja@12345'
    NYT_API_KEY='cUdTW6wVvh2Ve1733GYPO8xRIwy1UXFl'
    NYT_API_SECRET='LkC2iAXfMJlgHPRn'
    ```
5. Start the backend server:
    ```bash
    node server.js
    ```

### Frontend
1. Clone the repository:
    ```bash
    git clone  https://github.com/tejaGitH/frontendBookShelf.git 
    ```
2. Navigate to the frontend directory:
    ```bash
    cd /frontendBookShelf
    ```
3. Install dependencies:
    ```bash
    npm install --save
    ```
2. Navigate to the src:
    ```bash
    cd /src
    ```

5. Start the frontend server:
    ```bash
    PORT=3002 npm start 
    ```

## Usage
1. Open your browser and go to `http://localhost:3002` for the frontend and `http://localhost:3000` for the backend.
2. Sign up or log in using your email ID and password.
3. Explore the My Bookshelf section to search, add, and review books.
4. Check your Dashboard to see currently reading books, update progress, and view social cards with friends' updates.

## Project Structure
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
