import React from "react";
import DatePicker from 'react-date-picker'
import "../stylesheets/accountButtons.css"
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    birthdate: null,
    password: "",
    rPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    usernameError: "",
    birthdateError: "",
    passwordError: "",
    rPasswordError: "",
    redirect: false
};

export default class SignUpForm extends React.Component {

    state = initialState;

    handleFieldChangeEvent = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleCheckboxChangeEvent = event => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    handleDateChangedEvent = (date) => {
        this.setState({
            birthdate: date
        });
    };

    validate = () => {

        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let usernameError = "";
        let birthdateError = "";
        let passwordError = "";
        let rPasswordError = "";

        if (!this.state.firstname) {
            firstNameError = "First name cannot be blank";
        }
        else if (!this.state.firstname.match(/^[a-zA-Z]+$/)) {
            firstNameError = "First name should only have letters";
        }

        if (!this.state.lastname) {
            lastNameError = "Last name cannot be blank";
        }
        else if (!this.state.lastname.match(/^[a-zA-Z]+$/)) {
            lastNameError = "Last name should only have letters";
        }

        if (!this.state.email){
            emailError = "Invalid email";
        }
        else
        {
            let lastAtPos = this.state.email.lastIndexOf("@");
            let lastDotPos = this.state.email.lastIndexOf(".");

            if (!(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                this.state.email.indexOf("@@") === -1 &&
                lastDotPos > 2 &&
                this.state.email.length - lastDotPos > 2
            ))
            {
                emailError = "Email is not valid";
            }
        }

        if (!this.state.username) {
            usernameError = "Username cannot be blank";
        }
        else if (!this.state.username.match(/^[a-zA-Z0-9-_]{5,20}$/)) {
            usernameError = "Alphanumeric as well as _ and - must be between 5 and 20 characters";
        }

        if(this.state.birthdate === null)
        {
            birthdateError = "Please select your birthday";
        }
        else {
            let currentDate = Date.now();
            if ((currentDate - this.state.birthdate.getTime() < 410240038000)) {
                birthdateError = "You must be at least 13 years old to sign up for MeTube\n";
            }
        }

        if (!this.state.password || this.state.password.length < 8) {
            passwordError = "Password cannot be less than 8 characters";
        }

        if (!this.state.rPassword || this.state.rPassword.length < 8) {
            rPasswordError = "Password cannot be less than 8 characters";
        }
        else {
            if (!(this.state.password === this.state.rPassword)) {
                rPasswordError = "Passwords do not match";
            }
        }

        this.setState({emailError,
            firstNameError, lastNameError,
            usernameError, birthdateError,
            passwordError, rPasswordError});

        console.log("ran all checks");
        console.log(this.state);

        return ( emailError === "" &&
            firstNameError === "" &&
            lastNameError === "" &&
            usernameError === "" &&
            birthdateError === "" &&
            passwordError === "" &&
            rPasswordError === "" );
    };

    submit = () => {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);

            let formData = new FormData();
            formData.append('firstname', this.state.firstname)
            formData.append('lastname', this.state.lastname)
            formData.append('email', this.state.email)
            formData.append('username', this.state.username)
            formData.append('birthdate', this.state.birthdate)
            formData.append('password', this.state.password)

            axios({
                method: 'post',
                url: '/~nrengie/api/signup.php',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then((response) => {
                    //handle successs
                    console.log(response.data)
                    if(response.data.result === "false") {
                        this.setState({
                            usernameError: "Username/ email already exists",
                            emailError: "Username/ email already exists"
                        })
                    }
                    else this.redirecting();
                })
                .catch((response) => {
                    //handle error
                    console.log(response)
                });

            // clear form
            this.setState(initialState);
        }
    };

    redirecting = () => { this.setState({redirect: true}); }

    render() {
        if(this.state.redirect) {
            return(<Navigate to="/~nrengie/login" replace={true}/>)
        }
        return(
            <form onSubmit={this.handleSubmit} className={"formContainer"}>
                <div className="container">
                    <h1 style={{textAlign:"center"}}>Sign Up</h1>
                    <h2 style={{textAlign:"center"}}>Please fill in this form to create a MeTube account.</h2>
                    <hr />
                    <b>First Name</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.firstNameError}
                        </div>
                        <input
                            name="firstname"
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <b>Last Name</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.lastNameError}
                        </div>
                        <input
                            name="lastname"
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <b>Email</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.emailError}
                        </div>
                        <input
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <b>Username</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.usernameError}
                        </div>
                        <input
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <b>Birth Date</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.birthdateError}
                        </div>
                        <DatePicker
                            calendarAriaLabel="Toggle calendar"
                            clearAriaLabel="Clear value"
                            dayAriaLabel="Day"
                            monthAriaLabel="Month"
                            nativeInputAriaLabel="Date"
                            value={this.state.birthdate}
                            onChange={this.handleDateChangedEvent}
                            yearAriaLabel="Year"
                        />
                    </div>
                    <br />
                    <br />
                    <b>Password</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.passwordError}
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleFieldChangeEvent}
                        />
                    </div>
                    <b>Repeat Password</b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.rPasswordError}
                        </div>
                        <input
                            type="password"
                            name="rPassword"
                            placeholder="Repeat Password"
                            value={this.state.rPassword}
                            onChange={this.handleFieldChangeEvent}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="checkbox"
                            onChange={this.handleCheckboxChangeEvent}
                        />
                        Remember me
                    </div>
                    <button type="button" onClick={this.redirecting} className="cancelbtn button">Cancel</button>
                    <button type="button" onClick={this.submit} className="signupbtn button">Sign Up</button>
                </div>
            </form>
        );
    }
}