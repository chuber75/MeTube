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
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    return (
        <globalLoginState.Provider value={{ authenticated, setAuthenticated }}>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </Router>
        </globalLoginState.Provider>
    );
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

export default App;
