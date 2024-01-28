import { createContext } from "react";

const globalLoginState = createContext({
    authenticated: false,
    username: "",
    search: "",
});

export default globalLoginState;