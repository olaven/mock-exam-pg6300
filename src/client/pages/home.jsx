import React from "react";
import { Link } from "react-router-dom"; 

export class Home extends React.Component {

    constructor(props) {
        
        super(props);
    }

    render() {

        const loggedIn = this.props.username !== null;


        return <div id="home">
            <h1>Cantina home page!</h1>
            <Link to={"/week"}>
                <p className="homeMessage">Go to the week-menu.</p>
            </Link>
            <Link to={"/chat"}>
                Chat
                    </Link>
            {loggedIn ? 
                <div>
                    <h2>Admin options:</h2>
                    <Link to={"/editMenus"}>
                        Edit menus
                    </Link>
                    <Link to={"/editDishes"}>
                        Edit dishes
                    </Link>
                    <Link to={"/addDish"}>
                        Add dish
                    </Link>
                </div>:null}
        </div>
    }
}

