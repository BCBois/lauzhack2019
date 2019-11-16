import React, {useState} from 'react';
import ReactModal from 'react-modal'

import ThreadCreator from './ThreadCreator'

function ThreadList(props) {
    const threadList = props.threadList
    const socket = props.socket
    const toCreator = props.toCreator
    const toThread = props.toThread

    const threadTable = threadList.map(thread => 
    <div id="thread_entry">
         <p>thread.title</p> 
         <button onClick={toThread(thread.id)}>
                Open thread
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