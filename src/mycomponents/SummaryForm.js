import React, { useState } from 'react'
import axios from 'axios'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'

// for text editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';

const SummaryForm = (props) => {

    // create state for register summary
    const [title, setTitle] = useState('')
    const [content, setContent] = useState(EditorState.createEmpty())
    const [understanding, setUnderstanding] = useState('')
    const [folder, setFolder] = useState('')

    const onEditorStateChange = (editorState) => {
        setContent(editorState)
        console.log(draftToHtml(convertToRaw(content.getCurrentContent())))
    }


    const onSubmit = (e) => {

        // prevent default
        e.preventDefault()


        // make summary object for sending server
        // const summary = {
        //     title,
        //     content: JSON.stringify(convertToRaw(content.getCurrentContent())),
        //     understanding,
        //     folder
        // }
        const summary = {
            title,
            content: draftToHtml(convertToRaw(content.getCurrentContent())),
            understanding,
            folder
        }

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

    return (
        <div>
            <ExamplesNavbar />
            <LandingPageHeader />
            <form onSubmit={onSubmit}>
                Title <input type="text" name="title"
                    placeholder="Title" className="form-control"
                    onInput={(e) => setTitle(e.target.value)} />
                <br />
                Understanding
                <select className="form-control"
                    onChange={(e) => setUnderstanding(e.target.value)} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <br />
                <Editor
                    editorState={content}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                />
                <br />
                Folder <input type="text" name="folder"
                    placeholder="Folder" className="form-control"
                    onInput={(e) => setFolder(e.target.value)} />
                <button className="btn btn-success">Submit</button>
            </form>
        </div >
    )
}

export default SummaryForm