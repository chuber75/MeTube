import React from "react";
import "../stylesheets/navbar.css"
import Logo from "../images/default_logo.png";
import DefaultAccount from "../images/default_account.png";
import {Link, useNavigate} from "react-router-dom";
import globalLoginState from "./GlobalLoginState";

const initialState = {
    searchString: "",
    reload: false
};

let navigate

const UseNavigate = () => {
    navigate = useNavigate()
    return null
}

export default class Navbar extends React.Component {
    state = initialState;
    static contextType = globalLoginState;

    dropFunc() {
        document.getElementById("dropdown").classList.toggle("show");
    }

    searchBox = () => {
        return (
            <form id="search-form" className="searchbox">
                <div id="search-input">
                    <input
                        name="search_box"
                        placeholder="search"
                        value={this.state.searchString}
                        onChange={(event) => {
                            this.setState({
                                searchString: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
            </form>
        );
    }

    dropdown = () => {
        const context = this.context;
        if(context.authenticated){
            return (
                <div className="dropdown">
                    <input type="image" className="dropbtn" onClick={this.dropFunc}
                           src={DefaultAccount} alt={"Account"}/>
                    <div className="dropdown-content" id="dropdown">
                        <Link to={"/~nrengie/profile"}>Profile</Link>
                        <Link to={"/~nrengie/channel"}>Channel</Link>
                        <Link to={"/~nrengie/playlists"}>Playlists</Link>
                        <Link to={"/~nrengie/upload"}>Upload</Link>
                        <Link to={"/~nrengie/contacts"}>Contacts</Link>
                        <Link to={"/~nrengie/inbox"}>Inbox</Link>
                        <Link to={"/~nrengie/outbox"}>Outbox</Link>
                        <Link to={"/~nrengie/signout"}>Sign Out</Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="dropdown">
                <input type="image" className="dropbtn" onClick={this.dropFunc}
                       src={DefaultAccount} alt={"Account"}/>
                <div className="dropdown-content" id="dropdown">
                    <Link to={"/~nrengie/login"}>Log-in</Link>
                    <Link to={"/~nrengie/create_account"}>Sign up</Link>
                </div>
            </div>
        );
    };

    logo = () => {
        return (
            <Link to={"/~nrengie/"}><img src={Logo} alt={"Logo"}/></Link>
        );
    }

    searchButton = () => {
        const context = this.context;
        this.setState({reload: !this.state.reload});
        context.setSearch(this.state.searchString);
        navigate("/~nrengie/search");
    }

    render() {
        return (
            <div className="masthead">
                <UseNavigate />
                <div className="navbar_flex_div">
                    <div className="left">
                        {this.logo()}
                    </div>
                    <div className="center">
                        {this.searchBox()}
                        <button id="search-icon" className="searchbutton"
                                onClick={this.searchButton}> search
                        </button>
                    </div>
                    <div className="right">
                        {this.dropdown()}
                    </div>
                </div>
            </div>
        );
    }
}