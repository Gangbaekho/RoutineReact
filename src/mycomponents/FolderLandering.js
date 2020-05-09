import React, { useState, useEffect, useReducer } from 'react'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'

import { Tab, Col, Row, Nav } from 'react-bootstrap'
import MyCard from './MyCard'
import axios from 'axios'
import uuid from 'uuid'
import summaryReducer from '../reducers/SummaryReducer'
import SummaryContext from '../context/summaryContext'
import { getSummaries } from '../actions/SummaryActions'



const FolderLandering = (props) => {

    const [folderOptions, setFolderOptions] = useState([])
    const [summaries, dispatch] = useReducer(summaryReducer, [])
    const [folderSummaries, setFolderSummaries] = useState([])
    const [targetSummary, setTargetSummary] = useState('')


    useEffect(() => {
        axios.get(`http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}/folders`,
            {
                headers: {
                    authorization: 'Bearer ' + sessionStorage.getItem('token')

                }
            }).then((response) => {
                setFolderOptions(response.data.map((folder) => (folder)))


            }).catch('all users folder name can not be fetched.. failed')

        axios.get(`http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then((data) => dispatch(getSummaries(data.data.reverse())))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <ExamplesNavbar />
            <LandingPageHeader />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            {
                                folderOptions.map((folder) => (
                                    <Nav.Item key={uuid()}>
                                        <Nav.Link
                                            eventKey={folder}
                                            onSelect={(e) => setFolderSummaries(
                                                summaries.filter((summary) => summary.folder === e)
                                            )}>{folder}</Nav.Link>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                    </Col>
                    <Col sm={1}>
                        <Tab.Content>
                            {
                                // folderOptions.map((folder) => (
                                //     <Tab.Pane key={uuid()} eventKey={folder}>
                                //         {
                                //             folderSummaries !== undefined && folderSummaries.map((summary) => (
                                //                 <div key={uuid()} onClick={(e) => setTargetSummary(
                                //                     folderSummaries.find((summary) => summary.title === e.target.innerText)
                                //                 )}>
                                //                     {summary.title}
                                //                 </div>
                                //             ))
                                //         }
                                //     </Tab.Pane>
                                // ))
                            }
                            {
                                folderOptions.map((folder) => (
                                    <Tab.Pane key={uuid()} eventKey={folder}>
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                            <Row>
                                                <Nav variant="pills" className="flex-column">
                                                    {
                                                        folderSummaries !== undefined && folderSummaries.map((summary) => (
                                                            <Nav.Link key={uuid()} onClick={(e) => setTargetSummary(
                                                                folderSummaries.find((summary) => summary.title === e.target.innerText)
                                                            )}>
                                                                {summary.title}
                                                            </Nav.Link>
                                                        ))
                                                    }
                                                </Nav>
                                            </Row>
                                        </Tab.Container>
                                    </Tab.Pane>
                                ))
                            }

                        </Tab.Content>
                    </Col>
                    <Col sm={8}>
                        <SummaryContext.Provider value={{ summaries, dispatch }}>
                            {
                                targetSummary !== '' && <MyCard {...targetSummary} />
                            }
                        </SummaryContext.Provider>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default FolderLandering