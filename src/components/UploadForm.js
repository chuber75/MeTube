import React from "react";
import "../stylesheets/accountButtons.css";
import axios from "axios";
import {Navigate} from "react-router-dom";
import globalLoginState from "./GlobalLoginState";

const initialState = {
    selectedFile: null,
    uploadType: "default",
    rawFileName: "",

    mediaMime: "",
    mediaType: "",
    mediaTitle: "",
    mediaDescription: "",
    uploadDate: new Date(),
    mediaSize: 0,
    mediaPath: "",
    mediaTags: "",
    sharedType: "public",

    mediaID: 0,

    titleError: "",
    descriptionError: "",
    tagError: ""
};

export default class UploadForm extends React.Component {
    static contextType = globalLoginState;

    state = initialState;

    validate = () => {
        let titleError = "";
        let descriptionError = "";
        let tagError = "";

        if (!this.state.mediaTitle){
            titleError = "Title must be populated";
        }

        if (!this.state.mediaDescription) {
            descriptionError = "Description must be populated";
        }

        if (!this.state.mediaTags) {
            tagError = "Tags must be populated";
        }

        if (this.state.mediaTags.indexOf(" ") >= 0) {
            tagError = "Tags cannot contain spaces"
        }

        this.setState({descriptionError, titleError, tagError});

        return ( descriptionError === "" && tagError === "" && titleError === "" );
    };

    isLetter = (str) => {
        return str.length === 1 && (str.match(/[a-z]/i) || str.match(/[0-9]/i));
    }

    scrapeTitleTags = () => {
        let str = "";
        let input = this.state.mediaTitle.toLowerCase();

        for(let i=0; i<input.length; i++) {
            if(this.isLetter(input[i])) str += input[i];
            else if(i!==0 && this.isLetter(input[i-1])) str += ',';
        }

        return str;
    }

    handleTags = () => {
        return (
            this.state.rawFileName.split('.').pop() +
            "," +
            this.state.mediaTags.toLowerCase() +
            "," +
            this.scrapeTitleTags()
        );
    }

    handleUpload = () => {
        //console.log(JSON.stringify(this.state))
        let formData = new FormData();
        const context = this.context;
      
        formData.append('File', this.state.selectedFile)
        formData.append('username', context.username)
        formData.append('Mime', this.state.mediaMime)
        formData.append('Type', this.state.mediaType)
        formData.append('name', this.state.mediaTitle)
        formData.append('Description', this.state.mediaDescription)
        formData.append('size', this.state.mediaSize)
        formData.append('File_Path', this.state.mediaPath)
        formData.append('Tags', this.state.mediaTags)
        formData.append('shared_type', this.state.sharedType)

        axios({
            method: 'post',
            url: '/~nrengie/api/upload.php',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                //handle success
                console.log(response.data)
                if (response.data.result === true) {
                    this.setState({
                        mediaID: response.data.mediaID,
                        uploadType: "navigate"
                    })
                }
            })
            .catch((response) => {
                //handle error
                console.log(response)
            });
    }

    onFileUpload = () => {
        const isValid = this.validate();

        if(isValid) {
            this.setState({mediaTags: this.handleTags()}, () => this.handleUpload());
        }
    }

    onTextUpload = () => {
        const isValid = this.validate();

        if(isValid) {
            this.setState({
                mediaMime: "text/plain",
                mediaType: "text",
                mediaPath: "null",
            }, () => {
                this.handleUpload()
            });
        }
    }

    render() {
        switch (this.state.uploadType) {
            case "navigate":
                return(<Navigate to={"/~nrengie/view"} state={{mediaID: this.state.mediaID}}/>)
            case "default":
                return (this.defaultPage());
            case "text":
                return (this.textUpload());
            case "media":
                return (
                    <>
                        <form className={"formContainer"}>
                            <h2>Select a file for upload:</h2>
                            <hr />
                            <input
                                type="file"
                                onChange={(event)=> {
                                    this.onFileChange(event)
                                }}
                                onClick={(event)=> {
                                    event.target.value = null
                                }}
                            />
                            {this.mediaUpload()}
                        </form>
                    </>
                );
            default:
                return(<div>error in uploadType: {this.state.uploadType}</div>)
        }
    }

    mediaUpload = () => {
        return(
            <>
                <h2>Please fill out the rest of the media information</h2>
                <hr />

                <b>Title</b>
                <br />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.titleError}
                </div>
                <div>
                    <input
                        name="title"
                        placeholder="title"
                        value={this.state.mediaTitle}
                        onChange={(event) => {
                            this.setState({
                                mediaTitle: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
                <br />
                <b>Description</b>
                <br />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.descriptionError}
                </div>
                <div>
                    <input
                        name="description"
                        placeholder="description"
                        value={this.state.mediaDescription}
                        onChange={(event) => {
                            this.setState({
                                mediaDescription: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
                <br />
                <b>Tags</b>
                <p>Tags must be comma seperated with not spaces.</p>
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.tagError}
                </div>
                <div>
                    <input
                        name="tags"
                        placeholder="tags"
                        value={this.state.mediaTags}
                        onChange={(event) => {
                            this.setState({
                                mediaTags: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
                <div>
                    <label>
                        Choose the shared status:
                        <select value={this.state.sharedType}
                                onChange={
                                    (event) => {
                                        this.setState({sharedType: event.target.value});
                                    }
                                }>
                            <option defaultValue value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="friend">Friends</option>
                        </select>
                    </label>
                </div>

                <button type="button" onClick={this.onFileUpload} className="signupbtn button">Publish</button>
            </>
        );
    }

    onFileChange = (event) => {
        event.persist();
        this.setState({
            selectedFile: event.target.files[0],
            mediaTitle: event.target.files[0].name,
            rawFileName: event.target.files[0].name,
            mediaMime: event.target.files[0].type,
            mediaType: event.target.files[0].type.substring(0,event.target.files[0].type.indexOf("/")),
            mediaSize: event.target.files[0].size,
            mediaPath: event.target.files[0].type.concat(event.target.files[0].name),
        });
    }

    textUpload = () => {
        return(
            <form className={"formContainer"}>
                <h2>Please fill out the required information</h2>
                <hr />

                <b>Title</b>
                <br />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.titleError}
                </div>
                <div>
                    <input
                        name="title"
                        placeholder="title"
                        value={this.state.mediaTitle}
                        onChange={(event) => {
                            this.setState({
                                mediaTitle: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
                <br />
                <b>Text Post Body</b>
                <br />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.descriptionError}
                </div>
                <div>
                    <input
                        name="description"
                        placeholder="description"
                        value={this.state.mediaDescription}
                        onChange={(event) => {
                            this.setState({
                                mediaDescription: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
                <br />
                <b>Tags</b>
                <p>Tags must be comma seperated with not spaces.</p>
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.tagError}
                </div>
                <div>
                    <input
                        name="tags"
                        placeholder="tags"
                        value={this.state.mediaTags}
                        onChange={(event) => {
                            this.setState({
                                mediaTags: event.target.value
                            });
                        }}
                        type={"text"}
                    />
                </div>
                <div>
                    <label>
                        Choose the shared status:
                        <select value={this.state.sharedType}
                                onChange={
                                    (event) => {
                                        this.setState({sharedType: event.target.value});
                                    }
                                }>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="friend">Friends</option>
                        </select>
                    </label>
                </div>

                <button type="button" onClick={this.onTextUpload} className="signupbtn button">Publish</button>
            </form>
        );
    }

    defaultPage = () => {
        return(
            <div>
                <h2 style={{textAlign:"center"}}>Are we starting a text page or a media page?</h2>
                <button type="button" onClick={() => {this.setState({uploadType: "text"})}} className="signupbtn button">Text</button>
                <button type="button" onClick={() => {this.setState({uploadType: "media"})}} className="cancelbtn button">Media</button>
            </div>
        );
    }
}