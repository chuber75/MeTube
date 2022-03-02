import React, { useContext } from "react";
import authContext from "./authContext";

export default () => {
    const { setAuthenticated } = useContext(authContext);
    const handleLogin = () => setAuthenticated(true);
    const handleLogout = () => setAuthenticated(false);

    return (
        <React.Fragment>
            <button onClick={handleLogin}>login</button>
            <button onClick={handleLogout}>logout</button>
            <LoginStatus />
        </React.Fragment>
    );
};

function LoginStatus(){
    const { authenticated } = useContext(authContext);
    return (
        <p>
            auth status ${authenticated ? "in":"out"}
        </p>
    );
}