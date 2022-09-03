import React from 'react'
import {useAuth} from './context/useAuth'
import {Navigate} from 'react-router-dom'

function ProtectedRoute({children}) {
  const { user } = useAuth();
  if (!user) {
    alert("not authed")
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute