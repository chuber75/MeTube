import React from "react";
import "../stylesheets/accountButtons.css"
import axios from "axios";
import globalLoginState from "./GlobalLoginState";
import DatePicker from "react-date-picker";
import {Navigate} from "react-router-dom";

export default class ProfileForm extends React.Component {
    static contextType = globalLoginState;

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            username: "test",
            birthdate: new Date(),
            password: "",
            rPassword: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            rPasswordError: "",
            redirect: false
        }
    }

    componentDidMount() {
        const context = this.context;

        this.setState({username: context.username}, () => {this.handleLoadData()})
    }

    handleLoadData = () => {
        let formData = new FormData();
        formData.append('type', "fetch");
        formData.append('username', this.state.username);

        console.log(this.state.username);

        axios({
            method: 'post',
            url: '/~nrengie/api/profile.php',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                //get information from SQL table

                console.log(JSON.stringify(response.data))

                this.setState({
                    firstname : response.data.firstname,
                    lastname : response.data.lastname,
                    email : response.data.email,
                    birthdate : response.data.birthdate,
                })
            })
            .catch((response) => {
                //handle error
                console.log(response)
            })
    }

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

    validate = () => {

        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
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

        if (!this.state.password || this.state.password.length < 8) {
            passwordError = "Password cannot be less than 8 characters";
        }
        else {
            if (!(this.state.password === this.state.rPassword)) {
                rPasswordError = "Passwords do not match";
            }
        }

        this.setState({firstNameError,
            lastNameError, emailError,
            passwordError, rPasswordError});

        return (
            firstNameError === "" &&
            lastNameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            rPasswordError === "" );
    };

    handleSubmit = () => {
        const isValid = this.validate();
        if (isValid) {
            let formData = new FormData();
            formData.append('type', "submit");
            formData.append('firstname', this.state.firstname)
            formData.append('lastname', this.state.lastname)
            formData.append('email', this.state.email)
            formData.append('username', this.state.username)
            formData.append('password', this.state.password)

            axios({
                method: 'post',
                url: '/~nrengie/api/profile.php',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(() => {
                    //need to split up response data and pass it into handleLogin
                    this.setState({
                        password : "",
                        rPassword: ""
                    })
                })
                .catch((response) => {
                    //handle error
                    console.log(response)
                })
        }};

    render() {
        if(this.state.redirect) {
            return (
                <Navigate to={"/~nrengie/"} />
            );
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <h1 style={{textAlign:"center"}}>Profile</h1>
                    <h2 style={{textAlign:"center"}}>Feel free to make any changes to your profile information</h2>
                    <hr />
                    <b>Username: </b>
                    <input
                        name="username"
                        placeholder={this.state.username}
                        value={this.state.username}
                        readOnly={true}
                        type={"text"}
                    />
                    <br />
                    <b>Birth Date: </b>
                    <DatePicker
                        calendarAriaLabel="Toggle calendar"
                        clearAriaLabel="Clear value"
                        dayAriaLabel="Day"
                        monthAriaLabel="Month"
                        nativeInputAriaLabel="Date"
                        value={this.state.birthdate}
                        readOnly={true}
                        yearAriaLabel="Year"
                    />
                    <br />
                    <br />
                    <b>First Name: </b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.firstNameError}
                        </div>
                        <input
                            name="firstname"
                            placeholder={this.state.firstname}
                            value={this.state.firstname}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <b>Last Name: </b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.lastNameError}
                        </div>
                        <input
                            name="lastname"
                            placeholder={this.state.lastname}
                            value={this.state.lastname}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <b>Email: </b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.emailError}
                        </div>
                        <input
                            name="email"
                            placeholder={this.state.email}
                            value={this.state.email}
                            onChange={this.handleFieldChangeEvent}
                            type={"text"}
                        />
                    </div>
                    <br />
                    <b>Password: </b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.passwordError}
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder={this.state.password}
                            value={this.state.password}
                            onChange={this.handleFieldChangeEvent}
                        />
                    </div>
                    <b>Repeat Password: </b>
                    <br />
                    <div>
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.rPasswordError}
                        </div>
                        <input
                            type="password"
                            name="rPassword"
                            placeholder = {this.state.rPassword}
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
                    <button type="button" onClick={() => {this.setState({redirect: true})}} className="cancelbtn button">Cancel</button>
                    <button type="button" onClick={this.handleSubmit} className="update profile button">Update Profile</button>
                </div>
            </form>
        );
    }
}