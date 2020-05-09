import React from 'react'
import axios from 'axios'

const FilteredSummary = (props) => {

    axios.get(`http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}/routine`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then((data) => console.log(data.data))
        .catch((error) => console.log(error))

    return (
        <div>
            Hello
        </div>
    )
}

export default FilteredSummary