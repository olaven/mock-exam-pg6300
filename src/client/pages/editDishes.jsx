import React from "react";

import { LinkToHome } from "../components/linkToHome"; 
import fetching from "../fetching"; 
import { EditDishCard } from "../components/editDishCard";

export class EditDishes extends React.Component {

    constructor(props) {

        super(props); 
        this.state = {
            dishes: [], 
            errorMessage: "" 
        }
    }

    componentDidMount() {

        if (this.props.username !== null) {
            // no point in fetching if page should not be displayed 
            this.fetchDishes(); 
        }
    }

    fetchDishes = async () => {

        try {
            
            const dishes = await fetching.get.dishes(); 
            this.setState({
                dishes, 
                errorMessage: "" 
            }); 
        } catch(error) {
            console.log(error); 
            this.setState({
                errorMessage: "An error occured talking to server."
            }); 
        }
    }

    renderDishes = () => this.state.dishes.map(dish => 
        <EditDishCard onDelete={this.fetchDishes} dish={dish} key={dish.id}/>
    )

    render() {

        const loggedIn = this.props.username !== null; 
        if (!loggedIn) return <LinkToHome />

        return <div>
            <h1>Edit dishes</h1>
            {this.state.errorMessage}
            {this.renderDishes()}
        </div>
    }
}

