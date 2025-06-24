import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const ProtectedRoutes = ({ children }) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const getAccessToken = async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ["api://rincondelremo/.default"], 
            account: accounts[0],
          });

          const idToken = response.idToken;    
          const accessToken = response.accessToken; 

          const decoded = jwtDecode(accessToken);   
          console.log("Claims:", decoded);

          console.log("Tipo de usuario:", decoded["Tipo de usuario"]);

        } catch (error) {
          console.error("Error al obtener token:", error);
        }
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [isAuthenticated, accounts, instance]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoutes;
