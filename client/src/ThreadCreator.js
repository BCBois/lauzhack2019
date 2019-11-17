import React, {useState} from 'react';

function ThreadCreator(props) {
    const socket = props.socket
    const back = props.back
    const parentId = props.parentId

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
                const threadId = Math.random()
                const date = new Date().toDateString()
                socket.emit('create_thread', {id: threadId, title: title, parentId: parentId, messages: [{author: author, content: content, type: "msg", date: date}]})
                if(parentId != null) {
                    socket.emit('create_msg', parentId, {author: author, content: threadId, type: "thread", date: date})
                }
                // TODO : tags
                back()
            }}>
                Create thread
            </button>
            <button onClick={back}>
                Back
            </button>

        </div>
    )
}

export default ThreadCreator