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
    NavLink,
    ButtonGroup,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Alert
} from "reactstrap";
import axios from 'axios'
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js'

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

    // convert JSON to Html
    const convertCommentFromJSONToHTML = (text) => { return stateToHTML(convertFromRaw(JSON.parse(text))) }


    const handleChangeUnderstanding = (understanding) => {

        const newSummary = {
            id: props.id,
            title: props.title,
            content: props.content,
            understanding,
            folder: props.folder,
            createdate: props.createdate
        }

        axios.put(
            `http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}/${props.id}`,
            newSummary,
            {
                headers: {
                    authorization: 'Bearer ' + sessionStorage.getItem('token')

                }
            }).then(() => {
                console.log('summary modify success')
            })
            .catch('summary modify failed')
    }

    return (
        < div >
            <Card className="text-center">
                <Alert color={props.understanding !== 1 ? props.understanding === 2 ? 'warning' : 'success' : 'danger'}>
                    <UncontrolledDropdown className="btn-group">
                        <DropdownToggle
                            aria-expanded={false}
                            aria-haspopup={true}
                            caret
                            color="link"
                            data-toggle="dropdown"
                            type="button"
                            className="text-white"
                        >
                            {props.understanding !== 1 ? props.understanding === 2 ? 'Normal' : 'Good' : 'Weak'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem href="#pablo" onClick={() => handleChangeUnderstanding(1)}>
                                Weak
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => handleChangeUnderstanding(2)}>
                                Normal
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={e => handleChangeUnderstanding(3)}>
                                Success
                            </DropdownItem>
                            <DropdownItem divider />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Alert>
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
                </CardBody>
                {!toggle &&
                    <div style={{ textAlign: 'left', paddingLeft: '30px' }}>
                        <CardTitle tag="h4" style={{ paddingTop: '0px' }}>{props.title}</CardTitle>
                        {props.content !== undefined &&
                            <div dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(props.content) }}></div>
                        }
                    </div>
                }
            </Card>
        </div >
    )
}

export default MyCard