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

        this.mountTime = new Date().getMilliseconds();
    }


    shouldComponentUpdate() {

        const now = new Date().getMilliseconds();
        const timeSinceLoading = this.mountTime - now; 
        // I do not want to fetch for null-dishes forever, as there could just be no dishes
        return !this.state.dish && (timeSinceLoading < 500)
    }

    componentDidUpdate() {

        if (this.props.menu) {

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
            <h1>{this.props.day}</h1>
            {dish? 
                <DishCard dish={dish} />: 
                <h2>Nothing served this day</h2>}
        </div>
    }
}

