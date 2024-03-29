import React from "react";
import "../stylesheets/navbar.css"
import {Link} from "react-router-dom";
import axios from "axios";

export default class TempBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaID: 1,
            imgID: 5,
            result: []
        }
    }

    componentDidMount(){
        this.getContent()
    }

    getContent(){

        let formData = new FormData();
        formData.append('search', '');

        /*for( var value of formData.values()){
            console.log(value);
        }*/

        axios({
            method: 'post',
            url: '/~nrengie/api/search.php',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                //handle successs
                console.log(response.data)
                let results = response.data.results
                console.log(results)
                for(let i = 0; i < response.data.numResults; i++){
                    this.setState({result: [...this.state.result, {name: results[i].NAME, mediaID: results[i].Media_ID, mediaDesc: results[i].DESCRIPTION, type: results[i].TYPE, mediaTags: results[i].TAGS}]})
                }
            })
            .catch((response) => {
                //handle error
                console.log(response)
            });
    }

    parseResults = (result) => {
        return (
            <>
                {result.map(item => (
                    <div key={item}>
                        <li><Link to={"/~nrengie/view"} state={{mediaID: item.mediaID}}>{item.name}</Link></li>
                        <ul>
                            <li>Description: {item.mediaDesc}</li>
                            <li>Type: {item.type}</li>
                            <li>Tags: {item.mediaTags}</li>
                        </ul>
                    </div>
                ))}
            </>
        );
    }

    render() {
        return (
            <div>
                <ul>
                    {this.parseResults(this.state.result)}
                </ul>
            </div>
        );
    }
}