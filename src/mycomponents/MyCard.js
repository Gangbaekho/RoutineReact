import React, { useState, useContext } from "react";
import SummaryContext from '../context/summaryContext'
import { addQuestion, updateSummary } from '../actions/SummaryActions'
import uuid from 'uuid'
import ReactSearchBox from 'react-search-box'

// for alert

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

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


const MyCard = (props) => {

    // for redux hooks
    const { summaries, dispatch } = useContext(SummaryContext)

    const [toggle, setToggle] = useState(1)

    //for collapse
    const [collapses, setCollapses] = React.useState([]);
    const changeCollapse = collapse => {
        if (collapses.includes(collapse)) {
            setCollapses(collapses.filter(prop => prop !== collapse));
        } else {
            setCollapses([...collapses, collapse]);
        }
    };

    // for question form
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionContent, setQuestionContent] = useState('')

    // for search box data
    const [data, setData] = useState(summaries.map((summary => ({
        key: summary.id,
        value: summary.title
    }))))

    const handleChangeUnderstanding = (understanding) => {

        const newSummary = {
            id: props.id,
            title: props.title,
            content: props.content,
            understanding,
            related: props.related,
            questions: props.questions,
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
                dispatch(updateSummary(newSummary))
            })
            .catch('summary modify failed')
    }

    const handleRelateSummary = (relatedSummaryId) => {

        const relatedSummary = summaries.find((summary) => summary.id === relatedSummaryId)

        const newSummary = {
            id: props.id,
            title: props.title,
            content: props.content,
            understanding: props.understanding,
            questions: props.questions,
            related: [...props.related, relatedSummary],
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

    const handleQuestionForm = (e) => {
        e.preventDefault()

        const question = {
            title: questionTitle,
            content: questionContent
        }

        axios.post(
            `http://localhost:8080/question/${sessionStorage.getItem('authenticatedUser')}/${props.id}`,
            question,
            {
                headers: {
                    authorization: 'Bearer ' + sessionStorage.getItem('token')

                }
            }).then(() => {
                console.log('question submit sccess')
                dispatch(addQuestion(props.id, {
                    id: uuid(),
                    title: questionTitle,
                    content: questionContent
                }))
            })
            .catch('question form send failed')
    }

    return (
        < div >
            <Card>
                <Alert
                    className="text-center"
                    color={props.understanding !== 1 ? props.understanding === 2 ? 'warning' : 'success' : 'danger'}>
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
                <CardHeader className="text-center">
                    <Button className="button-color" color="primary" size="sm"
                        onClick={() => setToggle(1)}>Questions</Button>
                    <Button className="button-color" color="primary" size="sm"
                        onClick={() => setToggle(2)}>Summary</Button>
                    <Button className="button-color" color="primary" size="sm"
                        onClick={() => setToggle(3)}>Create Question</Button>
                    <Button className="button-color" color="primary" size="sm"
                        onClick={() => setToggle(4)}>Relate Summary</Button>
                </CardHeader>
                <CardBody className="text-center">
                    {toggle === 1 && props.questions !== undefined &&
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
                    {toggle === 3 &&
                        <form onSubmit={handleQuestionForm} className="text-left">
                            Title <input type="text" name="title"
                                placeholder="Title" className="form-control"
                                onInput={(e) => setQuestionTitle(e.target.value)} />
                            <br />
                            Content <textarea
                                placeholder="Content" className="form-control"
                                onInput={(e) => setQuestionContent(e.target.value)} />
                            <button className="btn btn-success">Submit</button>
                        </form>
                    }
                    {toggle === 4 &&
                        <ReactSearchBox
                            placeholder="Search the title."
                            data={data}
                            onSelect={record => handleRelateSummary(record.key)}
                        />}
                </CardBody>
                {toggle === 2 &&
                    <div style={{ textAlign: 'left', paddingLeft: '30px' }}>
                        <CardTitle tag="h4" style={{ paddingTop: '0px', textAlign: 'center', paddingBottom: '30px' }}>{props.title}</CardTitle>
                        {
                            props.content !== undefined &&
                            <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
                        }
                    </div>
                }
            </Card>
        </div >
    )
}

export default MyCard