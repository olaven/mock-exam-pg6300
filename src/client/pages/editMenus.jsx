import React from "react";
import { Table, Form } from "reactstrap";
import fetching from "../fetching";
import { day } from "../../shared/day";

export class EditMenus extends React.Component {

    constructor(props) {
        
        super(props);

        this.state = {
            menus: [], 
            dishes: []
        }
    }

    componentDidMount = async () => {

        this.fetchMenus();
        this.fetchDishes();
    }

    fetchMenus = async () => {

        const menus = await fetching.menus();
        this.setState({
            menus
        });
    }

    fetchDishes = async () => {

        const dishes = await fetching.dishes();
        this.setState({
            dishes
        });
    }

    update = (dishName, menu) => {

        console.log("before ", menu)
        
        const dishId = this.state.dishes.find(dish => dish.name === dishName).id; 
        menu.dishId = dishId;

        console.log("after ", menu);
    }

    renderTableBody = () => {

        

        const rows = this.state.menus.map(menu => <tr>
            <th>{menu.day}</th>
            <td>
                {this.renderSelect(menu)}
            </td>
        </tr>)
        return <tbody>
            {rows}
        </tbody>
    }

    renderSelect = menu => {

        let nameOfSelected; 
        const selected = this.state.dishes.find(dish => menu.dishId === dish.id);
        if (selected) {
            nameOfSelected = selected.name; 
        }

        console.log("name of selected: ", nameOfSelected);
        return <select onChange={(event) => {this.update(event.target.value, menu)}}>
            {this.state.dishes.map(dish => 
                (dish.name === nameOfSelected) ? 
                    <option selected>{dish.name}</option> : 
                    <option>{dish.name}</option>
                
            )}
        </select>
    }

    render() {

        return <div>
            <h1>Edit menus</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Dish</th>
                    </tr>
                </thead>
                
                {this.renderTableBody()}
            </Table>
        </div>
    }
}

