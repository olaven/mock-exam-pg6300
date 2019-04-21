import React from "react";

import { day } from "../../shared/day";
import { DishCard } from "../components/dishCard";
import { MenuCard } from "../components/menuCard";


export class Week extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            menus: []
        };
    }

    componentDidMount() {

        this.fetchMenus(); 
    }

    fetchMenus = async () => {

        const response = await fetch("/api/menus");
        const menus = await response.json(); 
    
        this.setState({menus: menus})
    }

    renderMenu = () => 
        this.state.menus.map(menu => <MenuCard key={menu.day} menu={menu} />)

    render() {
        
        return <div id="home">
            <h1>The menu this week:</h1> 
            {this.renderMenu()}
        </div>
    }
}

