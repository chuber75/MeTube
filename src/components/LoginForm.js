import React from "react";
import "../stylesheets/accountButtons.css";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import globalLoginState from "./GlobalLoginState";

const initialState = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    redirect: false,
};

export default class LoginForm extends React.Component {

    static contextType = globalLoginState;

    state = initialState;

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (!this.state.username){
            usernameError = "Invalid username";
        }

        if (!this.state.password || this.state.password.length < 8) {
            passwordError = "Password cannot be less than 8 characters";
        }

        this.setState({usernameError, passwordError});

        console.log("ran all checks");
        console.log(this.state);

        return ( usernameError === "" && passwordError === "" );
    };

    submit = () => {
        const isValid = this.validate();

        if (isValid) {
            console.log(this.state);

            let formData = new FormData();
            formData.append('username', this.state.username)
            formData.append('password', this.state.password)

            axios({
                method: 'post',
                url: '/~nrengie/api/login.php',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then((response) => {
                    //handle successs
                    console.log(response.data)
                    if(response.data.result === "usernameDNE") {
                        this.setState({
                            usernameError: "username does not exist"
                        })
                    } else if (response.data.result === "incorrectPass") {
                        this.setState({
                            passwordError: "Incorrect password"
                        })
                    } else if (response.data.result == true) {
                        let username = response.data.username

                        this.handleLogin(username);
                    }
                })
                .catch((response) => {
                    //handle error
                    console.log(response)
                });

            // clear form
            this.setState(initialState);
        }
    };

    redirecting = () => {
        this.setState({redirect: true});
    }

    handleLogin = (props) => {
        const context = this.context;

        context.setUsername(props);
        context.setAuthenticated(true);

        this.redirecting();
    }

    fakeLogin = () => {
        const context = this.context;

        context.setUsername("testUser");
        //pass for testUser = testtest
        context.setAuthenticated(true);

        this.redirecting();
    }


    render() {
        if (this.state.redirect) {
            return (<Navigate to="/~nrengie/" replace={true}/>)
        }
        return (
            <form className={"formContainer"}>
                <div className="container">
                    <h1 style={{textAlign:"center"}}>Login</h1>
                    <h2 style={{textAlign:"center"}}>Please fill in this form to sign in to your MeTube account.</h2>
                    <hr />
                    <b>Username</b>
                    <br />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.usernameError}
                    </div>
                    <div>
                        <input
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            type={"text"}
                        />
                    </div>
                    <b>Password</b>
                    <br/>
                    <div style={{fontSize: 12, color: "red"}}>
                        {this.state.passwordError}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={"padded"}>
                        <input
                            type="checkbox"
                            name="checkbox"
                            defaultChecked={true}
                            onChange={this.handleChange}
                        />
                        Remember me
                    </div>
                    <button type="button" onClick={this.submit} className="signupbtn button">Login</button>
                    <button type="button" onClick={this.redirecting} className="cancelbtn button">Cancel</button>
                    <button type="button" onClick={this.fakeLogin} className="cancelbtn button">fake login</button>
                </div>
                <div>
                    <br/>
                    <br/>
                    <p className={"container"}>Not registered? <Link to={"/~nrengie/create_account"}>Create an
                        account</Link></p>
                </div>
            </form>
        );
    }
}