import React from "react";
import { Table, Form } from "reactstrap";
import fetching from "../fetching";
import { day } from "../../shared/day";
import { LinkToHome } from "../components/linkToHome";

export class EditMenus extends React.Component {

    constructor(props) {
        
        super(props);

        this.noDish = {
            name: "Nothing served this day"
        }
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

        const menus = await fetching.get.menus();
        this.setState({
            menus
        });
    }

    fetchDishes = async () => {

        const dishes = await fetching.get.dishes();
        this.setState({
            dishes
        });
    }

    update = async (dishName, menu) => {
        
        const dish = this.state.dishes.find(dish => dish.name === dishName)
        if (!dish) {
            await fetching.del.menu(menu.day);
        } else {

            const dishId = dish.id; 
            menu.dishId = dishId;

            const updated = await fetching.put.menu(menu);
            if (!updated) {
                alert("an error occured when updating..");
            }
        }



        
    }

    renderTableBody = () => {

        const rows = this.state.menus.map(menu => <tr>
            <th>{menu.day}</th>
            <td>
                {this.renderSelect(menu)}
            </td>
        </tr>);

        return <tbody>
            {rows}
        </tbody>
    }

    renderSelect = menu => {

        let nameOfSelected; 
        const selected = this.state.dishes.find(dish => menu.dishId === dish.id);
        if (selected) {
            nameOfSelected = selected.name; 
        } else {
            nameOfSelected = this.noDish.name;
        }

        const everyOption = this.state.dishes.concat([this.noDish]);
        return <select className="edit-menu-select" onChange={(event) => {this.update(event.target.value, menu)}}>
            {everyOption.map(dish => 
                (dish.name === nameOfSelected) ? 
                    <option className="edit-menu-option" selected>{dish.name}</option> : 
                    <option className="edit-menu-option">{dish.name}</option>
            )}
        </select>
    }

    render() {

        console.log(this.state.dishes)
        console.log(this.state.menus);

        const loggedIn = this.props.username !== null; 

        if (!loggedIn) {
            return <LinkToHome />; 
        }
        
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

