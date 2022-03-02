import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TempBody from "./components/TempBody"
import globalLoginState from "./components/authContext";
import Login from "./components/Login";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
  return (
      <globalLoginState.Provider value={{ authenticated, setAuthenticated }}>
          <div>
              <Navbar />
              <Login />
              <TempBody />
          </div>
      </globalLoginState.Provider>
  );
}

export default App;
