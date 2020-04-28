import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LandingPageHeader from '../components/Headers/LandingPageHeader'
import ExamplesNavbar from '../components/Navbars/ExamplesNavbar'

// for text editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';

import Creatable from 'react-select/creatable';
import Select from 'react-select'

const SummaryForm = (props) => {

    // create state for register summary
    const [title, setTitle] = useState('')
    const [content, setContent] = useState(EditorState.createEmpty())
    const [understanding, setUnderstanding] = useState('')
    const [folder, setFolder] = useState('')

    // toggle for selecting folders or creating new folder
    const [folderToggle, setFolderToggle] = useState(true)

    // all user's folder
    const folderOptions = JSON.parse(sessionStorage.getItem('folders')).map((folder) => ({
        value: folder,
        label: folder
    }))

    const understandingOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" }
    ]

    const onEditorStateChange = (editorState) => {
        setContent(editorState)
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
            understanding: understanding.value,
            folder: folder.value
        }

        console.log(summary)

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

    // get all user's folders name
    useEffect(() => {
        if (sessionStorage.getItem('folders') === null) {
            axios.get(`http://localhost:8080/summary/${sessionStorage.getItem('authenticatedUser')}/folders`,
                {
                    headers: {
                        authorization: 'Bearer ' + sessionStorage.getItem('token')

                    }
                }).then((data) => {
                    sessionStorage.setItem('folders', JSON.stringify(data.data))
                    console.log(data.data)
                }).catch('all users folder name can not be fetched.. failed')
        }
    }, [])

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
                <Select options={understandingOptions}
                    onChange={value => setUnderstanding(value)} />
                <Editor
                    editorState={content}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                />
                <br />
                Folder
                <Creatable options={folderOptions}
                    onChange={value => setFolder(value)} />
                <button className="btn btn-success">Submit</button>
            </form>
        </div >
    )
}

export default SummaryForm