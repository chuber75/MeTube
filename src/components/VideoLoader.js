import React from "react";

export default function VideoLoader(props) {
    let videoPath = props.path;
    let videoExtension = props.ext;

    videoPath = "/~nrengie/".concat(videoPath);

    let w,h;
    if (props.miniPlayer === true) {
        w = "273";
        h = "153";
    } else {
        w = "640";
        h = "360";
    }

    return (
        <video width={w} height={h} controls >
            <source src={videoPath} type={videoExtension}/>
        </video>
    );
};