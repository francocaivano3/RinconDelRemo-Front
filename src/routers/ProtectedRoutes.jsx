import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = useIsAuthenticated();
    const {instance} = useMsal();

    if(isAuthenticated){
        return children;
    } else {
        instance.loginRedirect(loginRequest);
        return null;
    }
}

export default ProtectedRoutes;