import React from "react";
import { Link } from "react-router-dom";

import { day } from "../../shared/day";
import { code } from "../../shared/http";
import fetching from "../fetching";
import { MenuCard } from "../components/menuCard";


export class WeekGQL extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            menus: new Map(), 
            errorMessage: null
        };
    }

    componentDidMount = () => {

        this.fetchMenus();
    }

    fetchMenus = async () => {

        const fetchedMenus = await this.getMenusWithGraphQl()
        console.log("menus: ", fetchedMenus);
        const menus = new Map();

        fetchedMenus.forEach(menu => {
            menus.set(menu.day, menu);
        });

        console.log("converted menus: ", menus);

        this.setState({ menus: menus })
    }

    getMenusWithGraphQl = async () => {

        const query = `
            {
                getMenus {
                    day,
                    dish {
                        name, 
                        price, 
                        info
                    }
                }
            }
        `

        const url = "/graphql?query=" + query;
        let response; 
        let payload;
        
        try {

            response = await fetch(url);
            payload = await response.json();
        } catch (err) {

            this.setState({
                errorMessage: "ERROR when retrieving user info: " + err,
            });
            return;
        }


        if (response.status === code.OK) {

            if (payload.errors || !payload.data) {

                this.setState({
                    errorMessage: payload.errors[0].message || "ERROR IN REQUEST"
                });
            } else {
                this.setState({
                    errorMessage: null
                });

                return payload.data.getMenus;
            }

        } else {

            this.setState({
                errormessage: "Issue with HTTP connection: status code " + response.status
            });
        }
    }

    render() {

        const displayError = this.state.errorMessage !== null 
        if (displayError) {
            return <div>
                {this.state.errorMessage};
            </div>
        }
        const menus = this.state.menus;
        
        return <div id="home">
            <Link to="/week">Go to REST-version</Link> 
            <h1>The menu this week:</h1>
            {Array.from(Object.values(day)).map(
                (day) => <MenuCard key={day} day={day} menu={menus.get(day)} className="menu-card" />
            )}
        </div>
    }
}

