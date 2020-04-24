import React, { useState } from 'react'
import axios from 'axios'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'

import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale

// Import bootstrap(v3 or v4) dependencies
// import 'bootstrap/js/modal';
// import 'bootstrap/js/dropdown';
// import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

const SummaryForm = (props) => {

    // create state for register summary
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [understanding, setUnderstanding] = useState('')
    const [folder, setFolder] = useState('')



    const onSubmit = (e) => {

        // prevent default
        e.preventDefault()

        // make summary object for sending server
        const summary = { title, content, understanding, folder }

        axios.post(
            `http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}`,
            summary,
            {
                headers: {
                    authorization: 'Bearer ' + sessionStorage.getItem('token')

                }
            }).then(() => {
                console.log('summary form submit sccess')
                props.history.push('/repeat')
            })
            .catch('summary form send failed')


        // send to server to register

    }



    const onChange = (content) => {
        console.log('onChange', content)
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
                {
                    // Understanding <input type="number" name="understaning"
                    // placeholder="1~3 number" className="form-control"
                    // onInput={(e) => setUnderstanding(e.target.value)} />
                }
                Understanding
                <select className="form-control"
                    onChange={(e) => setUnderstanding(e.target.value)} >
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <br />
                Folder <input type="text" name="folder"
                    placeholder="Folder" className="form-control"
                    onInput={(e) => setFolder(e.target.value)} />
                <button className="btn btn-success">Submit</button>
            </form>
            <ReactSummernote
                value="Default value"
                options={{
                    lang: 'ru-RU',
                    height: 350,
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview']]
                    ]
                }}
                onChange={this.onChange}
            />
        </div >
    )
}

export default SummaryForm