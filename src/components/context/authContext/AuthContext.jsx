// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [isLogin, setIsLogin] = useState(() => {
//     const storedToken = localStorage.getItem("token");

//     if (storedToken) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   const handleLogin = () => {
//     setIsLogin(true);
//     localStorage.setItem("token", "true");
//   };

//   const handleLogaut = () => {
//     setIsLogin(false);
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedUser");
//   };

//   return (
//     <AuthContext.Provider value={{ isLogin, handleLogin, handleLogaut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   return context;
// };

import { createContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getTokenInfo = async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ["api://rincondelremo/.default"],
            account: accounts[0],
          });

          const decoded = jwtDecode(response.accessToken);
          setUserInfo(decoded);
        } catch (err) {
          console.error("Error al obtener el token:", err);
        }
      }
    };

    getTokenInfo();
  }, [accounts, instance]);

  const getRol = () => {
    if (userInfo?.roles?.length > 0) return userInfo.roles[0];
    if (userInfo?.["Tipo de usuario"]) return userInfo["Tipo de usuario"];
    return "Invitado";
  };

  return (
    <AuthContext.Provider value={{ userInfo, rol: getRol() }}>
      {children}
    </AuthContext.Provider>
  );
};
