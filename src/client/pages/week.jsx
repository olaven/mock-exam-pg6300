import React from "react";

import fetching from "../fetching";
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

        const menus = await fetching.menus();
    
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

