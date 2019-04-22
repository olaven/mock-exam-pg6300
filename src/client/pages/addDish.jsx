import React from "react";
import { Link } from "react-router-dom";
import { InputGroup, Input, InputGroupAddon, Button} from "reactstrap"

import fetching from "../fetching";
import { LinkToHome } from "../components/linkToHome";
import { allergy } from "../../shared/allergy";

export class AddDish extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: "NAME",
            price: 1,
            info: "INFO",
            allergies: [],
            buttonDisabled: false
        };
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

    postDish = async () => {

        const dish = {
            name: this.state.name, 
            price: this.state.price, 
            info: this.state.info, 
            allergies: this.state.allergies
        }

        console.log(dish);

        const posted = await fetching.post.dish(dish); 
        if (!posted) {
            alert("an error occured when adding..");
        }

        //TODO: clear input 
    }

    renderInputGroup = (identifier, type, value, onInput) => <div>
        <InputGroup>
            <InputGroupAddon addonType="prepend">{identifier}</InputGroupAddon>
            <Input type={type} value={value} onChange={onInput} />
        </InputGroup>
    </div>

    renderAllgergiesInput = allergies => {

        return <div>
            <InputGroup>
                <InputGroupAddon addonType="prepend">allergies</InputGroupAddon>
                <select multiple={true} onChange={this.updateAllergies}>
                    {Array.from(Object.values(allergy)).map(allergyValue =>
                        <option key={allergyValue}>{allergyValue}</option>)}
                </select>
            </InputGroup>
        </div>
    }


    render() {

        const loggedIn = this.props.username !== null;
        if (!loggedIn) {
            return <LinkToHome name="the page for adding dishes" /> 
        }
        
        return <div>
            <h1>Add a new dish:</h1>
            {this.renderInputGroup("Name", "text", this.state.name, this.updateName)}
            {this.renderInputGroup("Price", "number", this.state.price, this.updatePrice)}
            {this.renderInputGroup("Info", "text", this.state.info, this.updateInfo)}
            {this.renderAllgergiesInput()}
            {this.state.buttonDisabled? 
                <Button color="secondary" disabled>Add</Button>: 
                <Button color="primary" onClick={this.postDish}>Add</Button>}
        </div>
    }
}

