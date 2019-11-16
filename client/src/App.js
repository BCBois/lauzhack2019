import React, { useState } from 'react';
import openSocket from 'socket.io-client'

import './App.css';
import Thread from './Thread'
import ThreadList from './ThreadList'
import ThreadCreator from './ThreadCreator'

const socket = openSocket('http://localhost:12345/');

function App() {
  const [view, setView] = useState("threadlist")
  const [threadId, setThreadId] = useState("")
  const [threadList, setThreadList] = useState([])
  socket.emit('get_all_threads', (data) => {
    setThreadList(data)
  })
  socket.on('notify_new_thread', (thread) => {
    setThreadList([...threadList, thread])
  })
  socket.on('notify_new_msg', (o) => {
    const threadId = o.threadId
    const msg = o.msg
    setThreadList(
      threadList.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            messages: [...thread.messages, msg]
          }
        } else {
          return thread
        }
      })
    )
  })

  var inner
  switch (view) {
    case "threadlist":
      inner = <ThreadList threadList={threadList} socket={socket} toThread={(threadId) => { setView("thread"); setThreadId(threadId) }} toCreator={() => setView("threadcreator")} />
      break;
    case "thread":
      inner = <Thread thread={threadList.filter(t => t.id === threadId)[0]} socket={socket} back={() => setView("threadlist")} />
      break;
    case "threadcreator":
      inner = <ThreadCreator socket={socket} back={() => setView("threadlist")} />
      break;
    default:
      inner = <p>Error : Wrong view name selected</p>
      break;
  }

  return (
    <div className="App">
      <p>{view}</p>
      {inner}
    </div>
  )
}

export default App;
