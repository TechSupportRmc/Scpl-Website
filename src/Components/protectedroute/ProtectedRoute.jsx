import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth(); // Get current user from context
  const location = useLocation(); // Use location to pass the current path to Navigate

  return (
    <Route
      {...rest}
      element={
        currentUser ? (
          <Element />
        ) : (
          <Navigate 
            to='/adminlogin' 
            state={{ from: location }} 
            replace={true} // Replace the current entry in history
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
