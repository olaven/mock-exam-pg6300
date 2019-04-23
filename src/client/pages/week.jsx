import React from "react";
import { Link } from "react-router-dom";

import { day } from "../../shared/day";
import fetching from "../fetching";
import { MenuCard } from "../components/menuCard";


export class Week extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            menus: new Map()
        };
    }

    componentDidMount = () => {

        this.fetchMenus(); 
    }

    fetchMenus = async () => {

        const fetchedMenus = await fetching.get.menus();
        const menus = new Map(); 
        
        fetchedMenus.forEach(menu => {
            menus.set(menu.day, menu);
        });

        this.setState({menus: menus})
    }

    render() {
        
        const menus = this.state.menus; 

        return <div id="home">
            <Link to="/weekGQL">Go to GraphQL-version</Link> 
            <h1>The menu this week:</h1> 
            {Array.from(Object.values(day)).map(
                (day) => <MenuCard key={day} day={day} menu={menus.get(day)} className="menu-card"/>
            )}
        </div>
    }
}

