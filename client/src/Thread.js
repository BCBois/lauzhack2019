import React, {useState} from 'react';

function Thread(props) {
    const thread = props.thread
    const socket = props.socket
    const back = props.back
    const subthread = props.subthread

    const msgList = thread.messages.map(msg => <p>{msg.author} at {msg.date}:<br/>{msg.content}</p>)

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
                socket.emit('create_msg', thread.id, {
                    author: author,
                    content: content,
                    type: "msg",
                    date: new Date().toDateString()
                })
            }}>
                Send
            </button>
            <button onClick={subthread}>
                Create subthread
            </button>
        </div>
    )
}

export default Thread