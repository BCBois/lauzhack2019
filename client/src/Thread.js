import React, { useState } from 'react';

function Thread(props) {
    const thread = props.thread
    const socket = props.socket
    const back = props.back
    const subthread = props.subthread
    const toThread = props.toThread

    var msgList = thread.messages.map(msg => msg.type === "msg" ?
        <div>
            <p class="author">{msg.author} at {msg.date}:</p>
            <p>{msg.content}</p>
        </div> :
        <p>
            Discussion moved to a new thread:
            <button onClick={() => toThread(msg.content)}>Go to subthread</button>
        </p>
    )

    msgList = msgList.map(h => <div class="post">{h}</div>)

    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")

    return (
        <div id="thread_view">
            <button class="back" onClick={back}>
                Back
            </button>
            <h2 className="title">{thread.title}</h2>
            <div id="messages_list">
                {msgList}
            </div>
            <div className="reply_box">
                <div className="authorInput">
                    <textarea onChange={event => setAuthor(event.target.value)} placeholder="Nickname"></textarea>
                </div>
                <div className="contentInput">
                    <textarea onChange={event => setContent(event.target.value)} placeholder="Your reply"></textarea>
                </div>

                <button onClick={() => {
                    socket.emit('create_msg', thread.id, {
                        author: author,
                        content: content,
                        type: "msg",
                        date: new Date().toDateString()
                    })
                }}>
                    Send reply
</button>
                <button onClick={subthread}>
                    Create subthread
</button>
            </div>
        </div>
    )
}

export default Thread