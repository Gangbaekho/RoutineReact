import React, { useState } from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardTitle,
    Button,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

const MyCard = (props) => {

    const [toggle, setToggle] = useState(true)

    //for collapse
    const [collapses, setCollapses] = React.useState([]);
    const changeCollapse = collapse => {
        if (collapses.includes(collapse)) {
            setCollapses(collapses.filter(prop => prop !== collapse));
        } else {
            setCollapses([...collapses, collapse]);
        }
    };

    return (
        <div>
            <Card className="text-center">
                <CardHeader>
                    <Button color="primary" size="sm"
                        onClick={() => setToggle(true)}>Questions</Button>
                    <Button color="primary" size="sm"
                        onClick={() => setToggle(false)}>Summary</Button>
                    <Button color="primary" size="sm"
                        href={`/question/${sessionStorage.getItem('authenticatedUser')}/${props.id}`}>Create Question</Button>
                </CardHeader>
                <CardBody>
                    {toggle && props.questions !== undefined &&
                        props.questions.map((question, index) =>
                            (
                                <div key={question.id}>
                                    <CardHeader className="card-collapse" id="headingOne" role="tab">
                                        <h5 className="mb-0 panel-title">
                                            <a
                                                aria-expanded={collapses.includes(index + 1)}
                                                className="collapsed"
                                                data-parent="#accordion"
                                                href="#pablo"
                                                id="collapseOne"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    changeCollapse(index + 1);
                                                }}
                                            >
                                                {question.title}{" "}
                                                <i className="nc-icon nc-minimal-down" />
                                            </a>
                                        </h5>
                                    </CardHeader>
                                    <Collapse isOpen={collapses.includes(index + 1)}>
                                        <CardBody>
                                            {question.content}
                                        </CardBody>
                                    </Collapse>
                                    <br />
                                </div>
                            ))}
                    {!toggle &&
                        <div>
                            <CardTitle tag="h4">{props.title}</CardTitle>
                            <CardText>
                                {props.content}
                            </CardText>
                        </div>}
                </CardBody>
            </Card>
        </div >
    )
}

export default MyCard