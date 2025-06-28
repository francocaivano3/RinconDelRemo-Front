import { createContext, useEffect, useState, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getTokenInfo = async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ["api://rincondelremo/.default"],
            account: accounts[0],
          });

          const decoded = jwtDecode(response.accessToken);
          console.log(decoded);
          setUserInfo(decoded);
        } catch (err) {
          console.error("Error al obtener el token:", err);
        }
      }
      setIsLoading(false);
    };

    getTokenInfo();
  }, [accounts, instance]);


  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  };

  const getRol = () => {
    if (userInfo?.roles?.length > 0) return userInfo.roles[0];
    if (userInfo?.["Tipo de usuario"]) return userInfo["Tipo de usuario"];
    return "Invitado";
  };

  return (
    <AuthContext.Provider value={{ userInfo, rol: getRol(), isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be within provider");
  return context;
};

