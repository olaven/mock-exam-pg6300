/**
 *
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/index.jsx
 */

import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Layout } from "./layout/layout.jsx";
import { Home } from "./pages/home.jsx";
import { Week } from "./pages/week.jsx";
import { WeekGQL } from "./pages/weekGQL";
import { Chat } from "./pages/chat";
import { NotFound } from "./pages/notFound.jsx"
import { Login } from "./pages/login.jsx";
import { EditMenus } from "./pages/editMenus.jsx";
import { EditDishes } from "./pages/editDishes.jsx";
import { AddDish } from "./pages/addDish";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            userCount: 1
        };
    }

    // Updating username if session is set. 
    componentDidMount() {

        this.fetchAndUpdateUserInfo();
    }

    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            //that is ok
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload.username);
        }
    };

    updateLoggedInUser = (username) => {

        console.log(username);
        this.setState({
            username: username
        });
    }

    renderRouteWithUser = (path, Component) => {

        return <Route exact path={path}
            render={props =>
                <Component {...props}
                    username={this.state.username}
                    updateLoggedInUser={this.updateLoggedInUser}
                />
            }
        />
    }


    render() {

        return <BrowserRouter>
            <Layout
                username={this.state.username}
                updateLoggedInUser={this.updateLoggedInUser}>

                <Switch>
                    {this.renderRouteWithUser("/", Home)}
                    {this.renderRouteWithUser("/week", Week)}
                    {this.renderRouteWithUser("/weekGQL", WeekGQL)}
                    {this.renderRouteWithUser("/editMenus", EditMenus)}
                    {this.renderRouteWithUser("/editDishes", EditDishes)}
                    {this.renderRouteWithUser("/addDish", AddDish)}
                    {this.renderRouteWithUser("/chat", Chat)}
                    {this.renderRouteWithUser("/login", Login)}
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    }
}
