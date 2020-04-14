import React from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardTitle,
    Button,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

const MyCard = (props) => {
    return (
        <div>
            <Card className="text-center">
                <CardHeader>
                    <Button color="primary" size="sm">Questions</Button>
                    <Button color="primary" size="sm">Summary</Button>
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h4">Special title treatment</CardTitle>
                    <CardText>
                        With supporting text below as a natural lead-in to additional
                        content.
                    </CardText>
                    <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        Go somewhere
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default MyCard