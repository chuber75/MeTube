import React, { useState } from "react";
import "./stylesheets/app.css"
import Navbar from "./components/Navbar";
import TempBody from "./components/TempBody"
import globalLoginState from "./components/authContext";
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
    useLocation
} from "react-router-dom";
import authContext from "./components/authContext";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    return (
        <globalLoginState.Provider value={{ authenticated, setAuthenticated }}>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="login" element={<LoginRedirect />} />
                        <Route path="create_account" element={<CreateAccountRedirect />} />
                        <Route element={<RequireAuth />}>
                            <Route path="/authpage" element={<Authpage />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </globalLoginState.Provider>
    );
}

function useAuth() {
    return React.useContext(authContext);
}

function RequireAuth() {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login.php" state={{ from: location }} />;
    }
    return <Outlet />;
}

function PageNotFound() {
    return (
        <div>
            <Navbar />
            <h1 className="text">DIRECTORY NOT FOUND</h1>
        </div>
    )
}

function Homepage() {
    return (
        <div>
            <Navbar />
            <Login />
            <TempBody />
        </div>
    );
}

function Authpage() {
    return (
        <div>
            <Navbar />
            <h1>yoooooo</h1>
        </div>
    );
}

function LoginRedirect() {
    return <Navigate to="/login.php"/>;
}

function CreateAccountRedirect() {
    return <Navigate to="/signup.php"/>;
}

export default App;
