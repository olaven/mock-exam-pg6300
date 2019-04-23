import React from "react";
import {
    Input, InputGroupAddon, 
    InputGroup, Button
} from 'reactstrap';
import Select from "react-select";
import fetching from "../fetching"; 
import { allergy } from "../../shared/allergy";

export class EditDishCard extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: "", 
            price: -1, 
            info: "", 
            allergies: [],
            buttonDisabled: false
        }; 
    }

    componentDidMount() {

        this.setState({
            name: this.props.dish.name, 
            price: this.props.dish.price, 
            info: this.props.dish.info,
            allergies: this.props.dish.allergies 
        }); 
        
    }

    updateName = event => {

        const name = event.target.value; 
        this.setState({
            name: name,
            buttonDisabled: name.trim().length === 0
        }); 
    }

    updatePrice = event => {

        const price = event.target.value;
        this.setState({
            price: price,
            buttonDisabled: isNaN(price) || price === "" || price < 1
        }); 
    }

    updateInfo = event => {

        const info = event.target.value;
        this.setState({
            info: info,
            buttonDisabled: info.trim().length === 0
        }); 
    }

    updateAllergies = event => {

        const options = Array.from(event.target.options);
        const allergies = options.map(option => option.text)
        this.setState({
            allergies
        });
    }

    updateDish = () => {

        const dish = {
            id: this.props.dish.id, 
            name: this.state.name, 
            price: this.state.price, 
            info: this.state.info, 
            allergies: this.state.allergies
        }; 

        const updated = fetching.put.dish(dish); 
        if (!updated) {
            alert("an error occured when updating.."); 
        }
    }

    deleteDish = async () => {

        const deleted = fetching.del.dish(this.props.dish.id);
        if (!deleted) {
            alert("an error occured when deleting..");
        } else {
            this.props.onDelete();
        }
    }

    renderInputGroup = (identifier, type, value, onInput) => <div>
        <InputGroup>
            <InputGroupAddon addonType="prepend">{identifier}</InputGroupAddon>
            <Input type={type} value={value} onChange={onInput}/>
        </InputGroup>
    </div>

    renderAllgergiesInput = () => {

        return <div>
            <InputGroup>
                <InputGroupAddon addonType="prepend">allergies</InputGroupAddon>
                <select multiple={true} onChange={this.updateAllergies}>
                    {this.renderAllergyOptions()}
                </select>
            </InputGroup>
        </div>
    }

    renderAllergyOptions = () => Array.from(Object.values(allergy)).map(allergyValue => 
        <option key={allergyValue} selected={this.state.allergies.includes(allergyValue)}>{allergyValue}</option>    
    );
    

    render() {
    
        return <div>
            {this.renderInputGroup("name", "text", this.state.name, this.updateName)}
            {this.renderInputGroup("price", "number", this.state.price, this.updatePrice)}
            {this.renderInputGroup("info", "text", this.state.info, this.updateInfo)}
            {this.renderAllgergiesInput()}
            {this.state.buttonDisabled ? 
                <Button disabled color="secondary">Update</Button>: 
                <Button color="primary" onClick={this.updateDish}>Update</Button>
            }
            <Button color="danger" onClick={this.deleteDish}>Delete</Button> 
            <hr />
        </div>
    }
}

