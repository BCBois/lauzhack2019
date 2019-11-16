import React, {useState} from 'react';
import openSocket from 'socket.io-client'

import './App.css';
import Thread from './Thread'
import ThreadList from './ThreadList'
import ThreadCreator from './ThreadCreator'

const socket = openSocket('http://192.168.43.55:12345/');

function App() {
  const [view, setView] = useState("threadlist")
  const [threadId, setThreadId] = useState("")
  const [threadList, setThreadList] = useState([]) // TODO : load initial thread list
  socket.on('notify_new_thread', (thread) => {
    setThreadList([...threadList, thread])
  })
  socket.on('notify_new_msg', (o) => {
    const threadId = o.threadId
    const msg = o.msg
    setThreadList(
      threadList.map(thread => {
        if(thread.id === threadId) {
          return {
            ...thread,
            msgs: [...thread.msgs, msg]
          }
        } else {
          return thread
        }
      })
    )
  })

  return (
    <div className="App">
      {() => {
        switch(view) {
          case "threadlist":
              return <ThreadList threadList={threadList} socket={socket} toThread={(threadId) => {setView("thread"); setThreadId(threadId)}} toCreator={() => setView("threadcreator")} />
            case "thread":
                return <Thread thread={threadList[threadId]} socket={socket} back={() => setView("threadlist")} />
            case "threadcreator":
                return <ThreadCreator socket={socket} back={() => setView("threadlist")} />
          default:
            return <p>Error : Wrong view name selected</p>
        }
      }}
    </div>
  )
}

export default App;
