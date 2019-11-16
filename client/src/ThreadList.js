import React, {useState} from 'react';
import ReactModal from 'react-modal'

import ThreadCreator from './ThreadCreator'

function ThreadList(props) {
    const threadList = props.threadList
    const socket = props.socket

    const a = threadList.map(thread => <p>thread.title</p>)

    return (
        <div id="view">
            <div id="thread_list">
            {a}
            </div>
            <button onClick={() => {
                ...
            }}>
                Create thread
            </button>
        </div>
    )
}