import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      return true;
    } else {
      return false;
    }
  });

  const handleLogin = () => {
    setIsLogin(true);
    localStorage.setItem("token", "true");
  };

  const handleLogaut = () => {
    setIsLogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ isLogin, handleLogin, handleLogaut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
