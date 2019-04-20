import React from "react";
import { DishCard } from "../components/dishCard";


export class Week extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            dishes: []
        };
    }

    componentDidMount() {

        this.fetchDishes(); 
    }

    fetchDishes = async () => {

        const response = await fetch("/api/dishes");
        const dishes = await response.json(); 
        console.log(dishes);
        this.setState({
            dishes
        });
    }

    renderMenu = () => this.state.dishes.map(dish => 
        <DishCard key={dish.id} dish={dish}/> 
    );

    render() {

        return <div id="home">
            <h1>The menu this week:</h1> 
            {this.renderMenu()}
        </div>
    }
}

