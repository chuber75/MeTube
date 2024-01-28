import React, { Component } from 'react'
import {Navigate} from "react-router-dom";
import globalLoginState from "./GlobalLoginState";

const initialState = {
    redirect: false
};

export default class SignOut extends Component {
    state = initialState;
    static contextType = globalLoginState;

    logout = () => {
        this.setState({redirect: true});
        const context = this.context;

        context.setAuthenticated(false);
        context.setUsername("");
        context.setSearch("");
    }

    render() {
        if(this.state.redirect) {
            return (
                <Navigate to={"/~nrengie/"}/>
            );
        }
        return (
            <div>
                <button type = "button" className = "Logout button" onClick={this.logout}>Logout</button>
            </div>
        )
    }
}