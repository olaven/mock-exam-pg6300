import React from "react";
import { Link } from "react-router-dom"; 

export class LinkToHome extends React.Component {

    constructor(props) {
        
        super(props);
    }

    render() {

        const name = this.props.pagename? this.props.pagename: "this page"; 

        return <div>
            You are not allowed to use {name}. 
            <Link to={"/"}>Go back to home.</Link>
        </div>
    }
}

