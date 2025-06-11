import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { loginRequest } from "../../authConfig";

const MainContent = () => {
    const {instance} = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleRedirect = () => {
        instance.loginRedirect({
            ...loginRequest,
            prompt:"create",
        }).catch((error) => console.error(error));
    }

    return (
        <div>
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <div>
                        <h1>hola</h1>
                    </div>
                ) : (
                    null
                )}
            </AuthenticatedTemplate>
            
            <UnauthenticatedTemplate>
                <button onClick={handleRedirect}>signup</button>
            </UnauthenticatedTemplate>
        </div>
    )
}

export default MainContent;