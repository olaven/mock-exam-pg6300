import React from "react";

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

    componentDidMount() {

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

    renderMenu = () => Array.from(Object.values(day)).map(
        (day) => <MenuCard key={day} day={day} memu={this.state.menus.get(day)}/>
    ) 
        //this.state.menus.map((menu, index) => <MenuCard key={index} menu={menu} />)

    render() {
        
        return <div id="home">
            <h1>The menu this week:</h1> 
            {this.renderMenu()}
        </div>
    }
}

