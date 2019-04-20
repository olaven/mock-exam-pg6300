import React from "react";
import { Link } from "react-router-dom"; 

export class Home extends React.Component {

    constructor(props) {
        
        super(props);
    }

    render() {

        const loggedIn = this.props.username !== null;


        return <div id="home">
            <h1>This is home</h1>
            <Link to={"/week"}>
                <p className="homeMessage">Go to the week-menu.</p>
            </Link>
            <Link to={"/chat"}>
                Chat
                    </Link>
            {loggedIn ? 
                <div>EDIT MENU </div>:null}
        </div>
    }
}

