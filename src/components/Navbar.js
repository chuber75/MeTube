import React, {useContext} from "react";
import "../stylesheets/navbar.css"
import Logo from "../images/default_logo.png";
import DefaultAccount from "../images/default_account.png"
import authContext from "./authContext";
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {
    static auth = authContext;

    dropFunc() {
        document.getElementById("dropdown").classList.toggle("show");
    }

    searchBox = () => {
        return (
            <form id="search-form" className="searchbox">
                <div>
                    <div id="search-input">
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
            </form>
        );
    };

    dropdownLoggedOut = () => {
        return (
            <div className="dropdown">
                <input type="image" className="dropbtn" onClick={this.dropFunc}
                       src={DefaultAccount} alt={"Account"}/>
                <div className="dropdown-content" id="dropdown">
                    <Link to={"login"}>Log-in</Link>
                    <Link to={"create_account"}>Sign up</Link>
                </div>
            </div>
        );
    }

    dropdownLoggedIn = () => {
        return (
            <div className="dropdown">
                <input type="image" className="dropbtn" onClick={this.dropFunc}
                       src={DefaultAccount} alt={"Account"}/>
                <div className="dropdown-content" id="dropdown">
                    <Link to={"/account"}>Account</Link>
                </div>
            </div>
        );
    }

    dropdown = () => {
        var auth1 = this.context;
        if(auth1.authenticated) {
            return (
                <div className="dropdown">
                    <input type="image" className="dropbtn" onClick={this.dropFunc}
                           src={DefaultAccount} alt={"Account"}/>
                    <div className="dropdown-content" id="dropdown">
                        <Link to={"/account"} >Account</Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="dropdown">
                <input type="image" className="dropbtn" onClick={this.dropFunc}
                       src={DefaultAccount} alt={"Account"}/>
                <div className="dropdown-content" id="dropdown">
                    <Link to={"login"}>Log-in</Link>
                    <Link to={"create_account"}>Sign up</Link>
                </div>
            </div>
        );
    };

    logo = () => {
        return (
            <Link to={"/"}><img src={Logo} alt={"Logo"}/></Link>
        );
    }

    render() {

        return (
            <div className="masthead">
                <div className="navbar_flex_div">
                    <div className="left">
                        {this.logo()}
                    </div>
                    <div className="center">
                        {this.searchBox()}
                        <button id="search-icon" className="searchbutton"> search</button>
                    </div>
                    <div className="right">
                        {this.dropdown()}
                    </div>
                </div>
            </div>
        );
    }
}