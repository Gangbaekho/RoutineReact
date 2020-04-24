import React, { useState } from 'react'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import axios from 'axios'

const QuestionForm = (props) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const question = { title, content }

    const onSubmit = (e) => {
        e.preventDefault()

        axios.post(
            `http://localhost:8080/question/${sessionStorage.getItem('authenticatedUser')}/${props.match.params.summaryId}`,
            question,
            {
                headers: {
                    authorization: 'Bearer ' + sessionStorage.getItem('token')

                }
            }).then(() => {
                console.log('question submit sccess')
                props.history.push('/repeat')
            })
            .catch('question form send failed')

    }

    return (
        <div>
            <ExamplesNavbar />
            <LandingPageHeader />
            <form onSubmit={onSubmit}>
                Title <input type="text" name="title"
                    placeholder="Title" className="form-control"
                    onInput={(e) => setTitle(e.target.value)} />
                Content <input type="text" name="content"
                    placeholder="Content" className="form-control"
                    onInput={(e) => setContent(e.target.value)} />
                <button className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default QuestionForm