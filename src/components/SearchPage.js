import React from "react";
import globalLoginState from "./GlobalLoginState";
import axios from "axios";
import {Link} from "react-router-dom";

const initialState = {
    //test case, set result: [] when ready
    result: [
       // {name: "testname", mediaID: 1, mediaDesc: "test Desc", mediaTags: "tag1,tag2"},
       // {name: "testname2", mediaID: 5, mediaDesc: "test Desc2", mediaTags: "tag21,tag22"}
    ],
    numResults: 0
}

export default class SearchPage extends React.Component {

    state = initialState;

    static contextType = globalLoginState;

    componentDidMount(){
        this.getSearch()
    }


    getSearch = () => {
        const context = this.context;

        let formData = new FormData();
        formData.append('search', context.search);

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
                this.setState({numResults: response.data.numResults})
                let results = response.data.results
                console.log(results)
                for(let i = 0; i < this.state.numResults; i++){
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
                Number of results: {this.state.numResults}
                <ul>
                    {this.parseResults(this.state.result)}
                </ul>
            </div>
        );
    }
}