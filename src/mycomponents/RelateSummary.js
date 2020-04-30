import React, { useState, useEffect } from 'react'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'
import ReactSearchBox from 'react-search-box'

import axios from 'axios'

const RelateSummary = (props) => {

    const [summaries, setSummaries] = useState([])
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then((response) => {
            setSummaries(response.data.reverse())
            setData(response.data.reverse().map((summary) => ({
                key: summary.id,
                value: summary.title
            })))
        }).catch('can not fetch the summaries')
    }, [])

    return (
        <div>
            <ExamplesNavbar />
            <LandingPageHeader />
            <ReactSearchBox
                placeholder="Search the title."
                value="Doe"
                data={data}
                onSelect={record => console.log(record)}
            />
        </div>
    )
}

export default RelateSummary