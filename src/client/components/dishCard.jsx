import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export class DishCard extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {

        return <Card>
            <CardBody>
                <CardTitle>{this.props.dish.name}</CardTitle>
                <CardSubtitle>{this.props.dish.price}</CardSubtitle>
                <CardText>{this.props.dish.info}</CardText>
            </CardBody>
        </Card>
    }
}

