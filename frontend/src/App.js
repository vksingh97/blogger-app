import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import BloggerLandingPage from './components/BloggerLandingPage';

function App() {
  // Use useSelector hook to access userDetails state from the Redux store
  const userDetails = useSelector((state) => state.userDetails);

  // Function to check if user is logged in
  const isLoggedIn = () => {
    // Return true if user details are available (logged in), otherwise false
    return Object.keys(userDetails).length !== 0;
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        {/* Protected route for '/home' */}
        <Route
          path='/home'
          element={
            isLoggedIn() ? (
              <BloggerLandingPage userDetails={userDetails} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
