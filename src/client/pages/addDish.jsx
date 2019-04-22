import React from "react";
import { Link } from "react-router-dom";
import { InputGroup, Input, InputGroupAddon, Button, Badge} from "reactstrap"

import fetching from "../fetching";
import { LinkToHome } from "../components/linkToHome";
import { allergy } from "../../shared/allergy";
import { TimeStats } from "apollo-engine-reporting-protobuf";

export class AddDish extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: "",
            price: 1,
            info: "",
            allergies: [],
            buttonDisabled: true, 
            successMesageVisible: false 
        };
    }

    validateInput = () => {

        this.state.name//?
        this.state.price//? 
        this.state.info//? 

        if (this.state.name.trim().length === 0 ||
            this.state.info.trim().length === 0 ||
            isNaN(this.state.price) || this.state.price === "" || this.state.price  < 1) {
                
                this.setState({
                    buttonDisabled: true
                }); 
            } else {
                this.setState({
                    buttonDisabled: false 
                });
            }
    }


    onSuccessfulPost = () => {

        this.setState({
            successMesageVisible: true, 
            buttonDisabled: true, 
            name: "",
            price: 0, 
            info: "" 
        }); 
        setTimeout(() => {
            this.setState({
                successMesageVisible: false
            });
        }, 2000);
    }

    updateName = event => {

        // NOTE: passing the cb guarantees that state has changed when input is validated
        const name = event.target.value;
        this.setState({ name }, () => {
            this.validateInput();
        });
    }

    updatePrice = event => {

        const price = event.target.value;
        this.setState({ price }, () => {
            this.validateInput(); 
        });
    }

    updateInfo = event => {

        const info = event.target.value;
        this.setState({ info }, () => {
            this.validateInput();
        });
    }

    updateAllergies = event => {

        const options = Array.from(event.target.options);
        const allergies = options.filter(option => option.selected).map(option => option.text)
        
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

        const posted = await fetching.post.dish(dish); 
        if (!posted) {
            alert("an error occured when adding..");
        } else {
            this.onSuccessfulPost();
        }

    
    }

    renderInputGroup = (identifier, type, value, onInput) => <div>
        <InputGroup>
            <InputGroupAddon addonType="prepend">{identifier}</InputGroupAddon>
            <Input id={identifier} type={type} value={value} onChange={onInput} />
        </InputGroup>
    </div>

    renderAllgergiesInput = allergies => {

        return <div>
            <InputGroup>
                <InputGroupAddon addonType="prepend">allergies</InputGroupAddon>
                <select id="Allergies" multiple={true} onChange={this.updateAllergies}>
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
                <Button id="add-button" color="secondary" disabled>Add</Button>: 
                <Button id="add-button" color="primary" onClick={this.postDish}>Add</Button>}
            
            <br />
            {this.state.successMesageVisible?
                <Badge color="success" id="success-message">Dish added</Badge>: 
                ""}
        </div>
    }
}

