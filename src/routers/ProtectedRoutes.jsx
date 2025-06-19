import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useEffect } from "react";

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = useIsAuthenticated();
    const {instance} = useMsal();

    useEffect(() => { //con este use effect nos ahorramos que lo haga en cada render
        if (!isAuthenticated) {
            instance.loginRedirect(loginRequest);
        }
    }, [isAuthenticated, instance]);

    if (isAuthenticated) {
        return children;
    }

    return null;
}

export default ProtectedRoutes;