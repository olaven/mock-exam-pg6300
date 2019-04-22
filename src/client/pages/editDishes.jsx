import React from "react";

import { LinkToHome } from "../components/linkToHome"; 
import { get } from "../fetching"; 

export class EditDishes extends React.Component {

    constructor(props) {

        super(props); 
        this.state = {
            dishes: []
        }
    }

    componentDidMount() {

        this.fetchDishes(); 
    }

    fetchDishes = async () => {

        try {
            const dishes = await get.dishes(); 
            this.setState({
                dishes
            }); 
            console.log(dishes); 
        } catch(error) {

            alert("An error occured. Are you connected to the internet?"); 
        }
    }

    render() {

        const loggedIn = this.props.username !== null; 
        if (!loggedIn) return <LinkToHome />


        return <div>
            <h1>Edit dishes</h1>
        </div>
    }
}

