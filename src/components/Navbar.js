import React from "react";
import "../stylesheets/navbar.css"
import Logo from "../images/default_logo.png";
import DefaultAccount from "../images/default_account.png"

export default class Navbar extends React.Component {
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

    dropdown = () => {
        return (
            <div className="dropdown">
                <input type="image" className="dropbtn" onClick={this.dropFunc}
                       src={DefaultAccount}/>
                <div className="dropdown-content" id="dropdown">
                    <a href="./login.php">Log-in</a>
                    <a href="./signUp.php">Sign up</a>
                </div>
            </div>
        );
    }

    logo = () => {
        return (
            <a href="./index.html"><img src={Logo}/></a>
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