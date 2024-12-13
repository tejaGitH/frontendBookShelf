// // App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./utils/store";
// import LandingPage from "./components/LandingPage";
// import Dashboard from "./components/Dashboard/Dashboard";
// import PrivateRoute from "./components/common/PrivateRoute";
// import ErrorBoundary from "./components/common/ErrorBoundary";
// import About from "./components/Dashboard/About";
// import MyProgress from "./components/Dashboard/MyProgress/MyProgress";
// import Search from "./components/Dashboard/Search/Search";
// import Friends from "./components/Dashboard/Friends/Friends";
// import SocialUpdates from "./components/Dashboard/SocialUpdates/SocialUpdates";
// import MyBooks from "./components/NavBar/MyBooks/MyBooks";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <ErrorBoundary>
//             {/* <NavBar /> */}
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<LandingPage />} />
            
//             {/* Protected routes */}
//             <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
//             <Route path="/my-books" element={<PrivateRoute element={<MyBooks />} />} />
//             <Route path="/my-progress" element={<PrivateRoute element={<MyProgress />} />} />
//             <Route path="/search" element={<PrivateRoute element={<Search />} />} />
//             <Route path="/friends" element={<PrivateRoute element={<Friends />} />} />
//             <Route path="/social-updates" element={<PrivateRoute element={<SocialUpdates />} />} />
//             <Route path="/about" element={<About />} />
            
//             {/* Fallback route */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </ErrorBoundary>
//       </Router>
//     </Provider>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import About from "./components/Dashboard/About";
import MyProgress from "./components/Dashboard/MyProgress/MyProgress";

import SocialUpdatesPage from "./components/NavBar/SocialUpdates/SocialUpdatesPage";
import MyBooks from "./components/NavBar/MyBooks/MyBooks";
import MyFriends from "./components/NavBar/MyFriends/MyFriends"; // Import MyFriends component

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/my-books" element={<PrivateRoute element={<MyBooks />} />} />
            <Route path="/my-progress" element={<PrivateRoute element={<MyProgress />} />} />
           
           
            <Route path="/social-updates" element={<PrivateRoute element={<SocialUpdatesPage />} />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-friends" element={<PrivateRoute element={<MyFriends />} />} /> {/* Add this route */}
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
