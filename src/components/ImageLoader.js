import React from "react";

export default function ImageLoader(props) {
    const uniqueImageID = props.imgID;
    //need to fetch imagePath from database here
    //replace null values and width/ height values

    let imagePath = props.path;
    imagePath = "/~nrengie/".concat(imagePath);

    const w = "400";
    const h = "400";

    return (
        <img src={imagePath} width={w} height={h} alt={uniqueImageID}/>
    );
};