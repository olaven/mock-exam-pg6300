import React from "react";
import { DishCard } from "./dishCard.jsx";

export class MenuCard extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            dish: null
        }
    }

    componentDidMount() {

        if (this.props.menu.dishId) {
            
            this.fetchDish();
        }
    }

    fetchDish = async () => {

        const id = this.props.menu.dishId;
        const response = await fetch("/api/dishes/" + id)
        const dish = await response.json();

        this.setState({
            dish
        });
    }

    render() {

        const dish = this.state.dish; 
        
        return <div>
            <h1>{this.props.menu.day}</h1>
            {dish? 
                <DishCard dish={dish} />: 
                <h2>Nothing served this day</h2>}
        </div>
    }
}

