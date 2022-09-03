import { useState, useEffect, useContext , createContext} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter , Routes, Route } from "react-router-dom";
import SignUp from './SignUp'
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import LoginPage from './LoginPage';
// import {ThemeContext, useTheme} from './context/useTheme';
import { AuthProvider } from './context/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Todo from './Todo';
import Child from './Child';

function App() {
  return (
     <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="signup" element={ <SignUp /> } />
            <Route path="todo" element={<ProtectedRoute>
              <Todo/>
            </ProtectedRoute>} />
          </Routes>
        </AuthProvider>
    </HashRouter>


  )
}

export default App;
