import React from 'react';

function ThreadList(props) {
    const threadList = props.threadList
    const toCreator = props.toCreator
    const toThread = props.toThread

    var threadTable = threadList.map(thread =>
        <div className="thread_entry">
            <p class="author">Created by {thread.messages[0].author} the {thread.messages[0].date}</p>
            <p class="title">{thread.title}</p>
    <p class="text">{thread.messages[0].content}</p>
            <button onClick={() => toThread(thread.id)}>
                Read
            </button>
        </div>
    )

    if (threadTable.length == 0) threadTable = <p class="no-threads">No threads yet</p>

    return (
        <div id="view">
            <div id="thread_list">
                {threadTable}

                <button onClick={toCreator}>
                    Create thread
                </button>
            </div>
        </div>
    )
}

export default ThreadList