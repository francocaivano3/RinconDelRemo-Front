import { createContext, useEffect, useState, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { jwtDecode } from "jwt-decode";
import { deleteTenant, createEncargado } from "../../../service/users";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();

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
          setToken(response.accessToken);

          const fullName = decoded.name || response.account.name || "";
          const [firstName, ...lastParts] = fullName.split(" ");
          const lastName = lastParts.join(" ") || "Desconocido";
          console.log("Este es el rol antes del if >0 : ", decoded.roles)
          if (decoded.roles) {
            console.log("este es el rol antes de usarlo en auth", decoded.roles[0])
            const rolUser = decoded.roles[0]
            console.log("este es el rol despues de pasarlo a una variable", rolUser)
            if (rolUser) {
              console.log("Este es el id que envio para eliminar", decoded.oid)
              const id = decoded.oid
              console.log("Este es el id que paso a una variable", id)
              await deleteTenant(id)
              let newUserInfo = {
                Id: decoded.oid, // para Tenant también es "Id" según el DTO
                Name: firstName,
                LastName: lastName,
                Email: decoded.preferred_username || response.account.username,
                role: decoded.roles[0]
              };
              const token = response.accessToken;
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              console.log("Este es el usuario que convierto en encargado", newUserInfo)
              await createEncargado(newUserInfo, config)
            }
          }
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
    <AuthContext.Provider value={{ userInfo, rol: getRol(), isLoading, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be within provider");
  return context;
};

