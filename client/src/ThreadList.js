import React from 'react';

function ThreadList(props) {
    const threadList = props.threadList
    const toCreator = props.toCreator
    const toThread = props.toThread

    const threadTable = threadList.map(thread =>
        <div className="thread_entry">
<p class="author">Created by {thread.messages[0].author} the {thread.messages[0].date}</p>
            <p>{thread.title}</p>
            <button onClick={() => toThread(thread.id)}>
                Read
        </button>
        </div>)

    return (
        <div id="view">
            <div id="thread_list">
                {threadTable}
            </div>
            <button onClick={toCreator}>
                Create thread
            </button>
        </div>
    )
}

export default ThreadList