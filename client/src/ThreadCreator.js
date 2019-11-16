import React, {useState} from 'react';

function ThreadCreator(props) {
    const socket = props.socket
    const back = props.back

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")

    return (
        <div id="thread_creator">
            <div className="titleInput">
                <textarea onChange={event => setTitle(event.target.value)}></textarea>
            </div>
            <div className="authorInput">
                <textarea onChange={event => setAuthor(event.target.value)}></textarea>
            </div>
            <div className="contentInput">
                <textarea onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button onClick={() => {
                socket.emit('create_thread', {title: title, messages: [{author: author, content: content, type: "msg", date: new Date().toDateString()}]})
                // TODO : tags
                back()
            }}>
                Create thread
            </button>
            <button onClick={() => {back()}}>
                Back
            </button>

        </div>
    )
}

export default ThreadCreator