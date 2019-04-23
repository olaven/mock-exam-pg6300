/**
 * 
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/headerbar.jsx
 */
import React from "react";
import { Link } from 'react-router-dom';
import { Button, NavLink,  Nav, Navbar, NavItem, NavbarBrand } from "reactstrap";

import { code } from "../../shared/http";

export default class Header extends React.Component {

    logout = async () => {
        
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, { method: "post" });
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== code.NO_CONTENT) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        //TODO: history is not passed down.
        this.props.history.push("/");
    };

    renderLoggedIn = () => <div>
        <Link to={"/"}>Go home</Link>
        <Button
            color="warning"
            onClick={this.logout}>
            Logout
        </Button>
    </div>

    renderLoggedOut = () => <div>
        <Link to={"/"}>Go home</Link>
        <Link to={"/login"}>Login</Link>
    </div>

    render() {

        const loggedIn = this.props.username !== null;

        return <Navbar id="header">
            <NavbarBrand>Project title</NavbarBrand>
            {loggedIn ? this.renderLoggedIn(): this.renderLoggedOut()}
        </Navbar>
    }
}
