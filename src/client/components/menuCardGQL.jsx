import React from "react";
import { DishCard } from "./dishCard.jsx";


//NOTE: In this file, I do not have to fetch for the dish. 
// Everything is done by one request, with GraphQL 
export class MenuCardGQL extends React.Component {


    constructor(props) {

        super(props);

        this.state = {
            menu: null
        }
    }

    componentWillReceiveProps = nextProps => {
        
        this.setState({
            menu: nextProps.menu
        });
    }

    render() {

        if (this.state.menu) {

            const dish = this.state.menu.dish;
            return <div>
                <h1>{this.props.day}</h1>
                {dish ?
                    <DishCard dish={dish} /> :
                    <h2>Nothing served this day</h2>}
            </div>
        }
        return <div>
            Hei
        </div>

        // return <div>
        //     <h1>{this.props.day}</h1>
        //     {(!error || dish) ?
        //         <DishCard dish={dish} /> :
        //         <h2>Nothing served this day</h2>}
        // </div>
    }
}

