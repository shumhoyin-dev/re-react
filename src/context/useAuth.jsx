import { createContext, useContext, useEffect, useMemo,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();


  useEffect(()=>{
    if(user){
      console.log("user here")
    }else{
      console.log("user not here")
    }
  },[user])

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
      const user = {
        user:data
      };
      const res = (await axios.post('https://todoo.5xcamp.us/users/sign_in',user));


      const userDta = {
        email: res.data.email,
        nickname: res.data.nickname,
        token: res.headers.authorization
      }
      const token = res.headers.authorization;
      axios.defaults.headers.common['Authorization'] = `${token}`;
      setUser(userDta);
      navigate("/todo");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error)
    }
  };

  const signup = async (data) => {
    try {
      delete data.repassword;
      const user = {
        user:data
      };
      const res = (await axios.post('https://todoo.5xcamp.us/users',user));
      alert(res.data.message)
      navigate("/")
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };


  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};