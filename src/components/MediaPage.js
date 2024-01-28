import React from "react";
import "../stylesheets/mediaPage.css"
import VideoLoader from "./VideoLoader";
import ImageLoader from "./ImageLoader";
import CommentLoader from "./CommentLoader";
import axios from "axios";
import globalLoginState from "./GlobalLoginState";
import {useLocation} from "react-router-dom";

let location

const UseLocation = () => {
    location = useLocation()
    return null
}

export default class MediaPage extends React.Component {
    static contextType = globalLoginState;

    constructor(props) {
        super(props);

        this.state = {
            mediaID: "",

            //different pages load depending on what mediaType is set to
            //so far there is a page made for "video", "image", "text", "audio" and a default page showing data
            mediaType: "null",

            mediaTitle: "Default",
            mediaDescription: "Default Description",
            viewerCount: 0,
            uploadDate: "",
            mediaSize: 0,
            mediaPath: "",
            mediaTags: "",
            mimeType: "",
            mediaRating: 3
        }
    }

    componentDidMount() {
        /* *****************************************************
         * THIS IS CALLED EVERY TIME THIS PAGE LOADS
         * MIGHT BE THE BEST PLACE TO MAKE THE AXIOS CALL???
         * *****************************************************
         */
        this.setState({mediaID: location.state.mediaID}, () => this.loadMedia());
    }

    loadMedia = () => {
        const context = this.context;
        let formData = new FormData();
        formData.append('mediaID', this.state.mediaID)
        formData.append('username', context.username)

        axios({
            method: 'post',
            url: '/~nrengie/api/loadMedia.php',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                //handle successs
                console.log(response.data)
                if(response.data.result == false) {
                    this.setState({
                        errorQuote: response.data.message,
                        mediaType: "failed"
                    })
                }
                else if (response.data.result == true) {
                    this.setState({
                        mediaTitle: response.data.mediaTitle,
                        mediaType: response.data.mediaType,
                        mediaSize: response.data.mediaSize,
                        mediaPath: response.data.mediaPath,
                        uploadDate: response.data.uploadDate,
                        mediaDescription: response.data.mediaDescription,
                        viewerCount: response.data.viewerCount,
                        mediaTags: response.data.mediaTags,
                        mimeType: response.data.mimeType
                    })
                }
            })
            .catch((response) => {
                //handle error
                console.log(response)
            });
    }

    handleRating = () => {
        if (this.state.mediaRating > 4) {
            return <div>★★★★★</div>;
        }
        if (this.state.mediaRating > 3) {
            return <div>★★★★☆</div>;
        }
        if (this.state.mediaRating > 2) {
            return <div>★★★☆☆</div>;
        }
        if (this.state.mediaRating > 1) {
            return <div>★★☆☆☆</div>;
        }
        if (this.state.mediaRating > 0) {
            return <div>★☆☆☆☆</div>;
        }
        return <div>☆☆☆☆☆</div>;
    }

    mediaSwitch = () => {
        switch (this.state.mediaType) {
            case "video":
                return (
                    <div>{this.videoPage()}</div>
                )
            case "image":
                return (
                    <div>{this.imagePage()}</div>
                )
            case "text":
                return (
                    <div>{this.textPage()}</div>
                )
            case "audio":
                return (
                    <div>{this.audioPage()}</div>
                )
            case "failed":
                return(
                    <div className = {"page"}>
                        <h1 className={"title"}>{this.state.errorQuote}</h1>
                    </div>
                )
            default:
                return (
                    <div className={"page"}>
                        <h1 className={"title"}>FAILED TO LOAD MEDIA</h1>
                        <p>mediaID = {this.state.mediaID}</p>
                        <p>mediaInfo = {JSON.stringify(this.state)}</p>
                    </div>
                )
        }
    }


    render() {
        return(
            <div>
                <UseLocation />
                {this.mediaSwitch()}
            </div>
        );
    }

    videoPage = () => {
        return (
            <div className={"page"}>
                <h1 className={"title"}>{this.state.mediaTitle}</h1>
                <div className={"media_flex"}>
                    <div className={"media_loader"}>
                        <VideoLoader path={this.state.mediaPath} ext={this.state.mimeType} miniPlayer={false} />
                    </div>
                    <div className={"media_info"}>
                        <div className={"media_info_flex"}>
                            <div className={"media_description"}>{this.state.mediaDescription}</div>
                            <div className={"media_data"}>
                                <div className={"media_data_flex"}>
                                    <div className={"media_data_25_percenters"}>
                                        views: {this.state.viewerCount}
                                    </div>
                                    <div className={"media_data_25_percenters"}>
                                        Upload Date: {this.state.uploadDate}
                                    </div>
                                </div>
                                <div className={"media_data_flex"}>
                                    <div className={"media_data_25_percenters"}>
                                        Rating:{this.handleRating()}
                                    </div>
                                    <div className={"media_data_download_container"}>
                                        <div>file size: {this.state.mediaSize}</div>
                                        <div>download button</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"comments"}>
                    Related Media goes here
                </div>
                <div className={"comments"}>
                    <CommentLoader mediaID={this.state.mediaID}/>
                </div>
            </div>
        );
    }

    imagePage = () => {
        return (
            <div className={"page"}>
                <h1 className={"title"}>{this.state.mediaTitle}</h1>
                <div className={"media_flex"}>
                    <div className={"media_loader"}>
                        <ImageLoader path={this.state.mediaPath} imgID={this.state.mediaID}/>
                    </div>
                    <div className={"media_info"}>
                        <div className={"media_info_flex"}>
                            <div className={"media_description"}>{this.state.mediaDescription}</div>
                            <div className={"media_data"}>
                                <div className={"media_data_flex"}>
                                    <div className={"media_data_25_percenters"}>
                                        views: {this.state.viewerCount}
                                    </div>
                                    <div className={"media_data_25_percenters"}>
                                        Upload Date: {this.state.uploadDate}
                                    </div>
                                </div>
                                <div className={"media_data_flex"}>
                                    <div className={"media_data_25_percenters"}>
                                        Rating:{this.handleRating()}
                                    </div>
                                    <div className={"media_data_download_container"}>
                                        <div>file size: {this.state.mediaSize}</div>
                                        <div>download button</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"comments"}>
                    Related Media goes here
                </div>
                <div className={"comments"}>
                    <CommentLoader mediaID={this.state.mediaID}/>
                </div>
            </div>
        );
    }

    textPage = () => {
        return (
            <div className={"page"}>
                <h1 className={"title"}>{this.state.mediaTitle}</h1>
                <div className={"comments"}>
                    body of text post goes here
                </div>
                <div style={{marginTop: "4px", marginBottom: "4px"}}>
                    <div className={"media_data clearBorder"}>
                        <div className={"media_data_flex"}>
                            <div className={"media_data_25_percenters clearBorder"}>
                                views: {this.state.viewerCount}
                            </div>
                            <div className={"media_data_25_percenters"}>
                                Upload Date: {this.state.uploadDate}
                            </div>
                        </div>
                        <div className={"media_data_flex"}>
                            <div className={"media_data_25_percenters clearBorder"}>
                                Rating:{this.handleRating()}
                            </div>
                            <div className={"media_data_download_container clearBorder"}>
                                <div>file size: {this.state.mediaSize}</div>
                                <div>download button</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"comments"} style={{marginTop: "4px", marginBottom: "4px"}}>
                    Related Media goes here
                </div>
                <div className={"comments"}>
                    <CommentLoader mediaID={this.state.mediaID}/>
                </div>
            </div>
        );
    }

    audioPage = () => {
        return (
            <div className={"page"}>
                <h1 className={"title"}>{this.state.mediaTitle}</h1>
            </div>
        );
    }
}