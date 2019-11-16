import React, {useState} from 'react';

function Thread(props) {
    const thread = props.thread
    const socket = props.socket
    const back = props.back

    const msgList = thread.messages.map(msg => <p>{msg.content}</p>)

    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")

    return (
        <div id="view">
            <button onClick={back}>
                Back
            </button>
            <div id="messages_list">
            {msgList}
            </div>
            <div className="authorInput">
                <textarea onChange={event => setAuthor(event.target.value)}></textarea>
            </div>
            <div className="contentInput">
                <textarea onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button onClick={() => {
                socket.emit('create_msg', {threadId: thread.id, msg: {
                    author: author,
                    content: content,
                    type: "msg"
                }})
            }}>
                Send
            </button>
        </div>
    )
}

export default Thread