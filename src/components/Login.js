import React, { useContext } from "react";
import authContext from "./authContext";
import {Link, Navigate} from "react-router-dom";

export default () => {
    const { setAuthenticated } = useContext(authContext);
    const { Authenticated } = useContext(authContext);
    const handleLogin = () => setAuthenticated(true);
    const handleLogout = () => setAuthenticated(false);

    return (
        <React.Fragment>
            <button onClick={handleLogin}>login</button>
            <button onClick={handleLogout}>logout</button>
            <Link to={"authpage"}> authpp </Link>
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