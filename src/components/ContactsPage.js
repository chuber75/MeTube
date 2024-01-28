import React from "react";

import "../stylesheets/contactsPage.css"
import axios from "axios";

const initialState = {
    searchString: "",
    searchedUsers: [], //{name: 'test'},{name: 'test2'}
    associatedUsers: [{name:'test', association:"friend"}, {name:'test2', association:"family"}], //{name: 'test', association: 'family'}
    reload: false
}

export default class ContactsPage extends React.Component {

    state = initialState;

    validate = () => {
        return this.state.searchString.length >= 4;
    }

    handleStatusUpdate = (username) => (status) => (isNew) => {
        let formData = new FormData();
        formData.append('type', status);
        formData.append('username', username);

        axios({
            method: 'post',
            url: '/~nrengie/api/contacts.php',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                //handle successs
                console.log(response.data)
                this.setState({reload: !this.state.reload})
            })
            .catch((response) => {
                //handle error
                console.log(response)
            });
    }

    searched = (searchedUsers) => {
        return (
            <>
                {searchedUsers.map(user => (
                    <div key={user.name}>
                        {user.name}
                        <button id="add" className="searchbutton"
                                onClick={this.handleStatusUpdate(user.name, "friend", true)}> Add
                        </button>
                        <button id="block" className="searchbutton"
                                onClick={this.handleStatusUpdate(user.name, "block", true)}> block
                        </button>
                    </div>
                ))}
            </>
        );
    }

    arrayBreaker = (inArr) => (keyWord) => {
        let outArr = [];
        for(let i=0; i<inArr.size; i++) {
            if(inArr[i].association === keyWord) {
                outArr.push(inArr[i]);
            }
        }
        return outArr;
    }

    associated = (associatedUsers) => {
        return (
            <>
                {associatedUsers.map(user => (
                    <div key={user.name}>
                        {user.name}
                        <button id="family" className="searchbutton"
                                onClick={this.handleStatusUpdate(user.name, "family", true)}> family
                        </button>
                        <button id="favorite" className="searchbutton"
                                onClick={this.handleStatusUpdate(user.name, "favorite", true)}> favorite
                        </button>
                        <button id="friends" className="searchbutton"
                                onClick={this.handleStatusUpdate(user.name, "friends", true)}> friends
                        </button>
                        <button id="block" className="searchbutton"
                                onClick={this.handleStatusUpdate(user.name, "block", true)}> blocked
                        </button>
                    </div>
                ))}
            </>
        );
    }

    searchButton = () => {
        if (this.validate()) {
            console.log(this.state);

            let formData = new FormData();
            formData.append('type', 'search');
            formData.append('search', this.state.searchString);

            axios({
                method: 'post',
                url: '/~nrengie/api/contacts.php',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then((response) => {
                    //handle successs
                    console.log(response.data)
                    response.data.forEach((item) => {
                        this.setState({searchedUsers: this.state.searchedUsers.append({name: item})})
                    })
                })
                .catch((response) => {
                    //handle error
                    console.log(response)
                });
        }
    }

    searchBox = () => {
        return (
            <form id="search-form" className="searchbox">
                <div id="search-input" className={"row"}>
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
                    <button id="search-icon" className="searchbutton"
                            onClick={this.searchButton}> search
                    </button>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className={"page"}>
                <div className={"contact_flex_container"}>
                    <div>
                        Search for users here:
                        <hr style={{border: "2px solid #4d4d4d", marginBottom: 8}}/>
                        <div style={{alignContent: "center"}}>
                            {this.searchBox()}
                            {this.searched(this.state.searchedUsers)}
                        </div>
                    </div>
                    <div>
                        Associated Contacts
                        <hr style={{border: "2px solid #4d4d4d"}}/>
                        <div className={"column"}>
                            Family:
                            {this.associated(this.arrayBreaker(this.state.associatedUsers, "family"))}
                        </div>
                        <div className={"column"}>
                            Favorites:
                            {this.associated(this.arrayBreaker(this.state.associatedUsers, "favorites"))}
                        </div>
                        <div className={"column"}>
                            Friends:
                            {this.associated(this.arrayBreaker(this.state.associatedUsers, "friends"))}
                        </div>
                        <div className={"column"}>
                            Blocked:
                            {this.associated(this.arrayBreaker(this.state.associatedUsers, "blocked"))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}