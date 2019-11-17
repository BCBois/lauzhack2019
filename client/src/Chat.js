import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client'
import Thread from './Thread'
import ThreadList from './ThreadList'
import ThreadCreator from './ThreadCreator'

const socket = openSocket('http://localhost:12345/');

function Chat() {
  const [view, setView] = useState("threadlist")
  const [threadId, setThreadId] = useState("")
  const [threadList, setThreadList] = useState([])

  useEffect(() => {
    socket.emit('get_all_threads', (data) => {
      setThreadList(data)
    })
    socket.on('notify_new_thread', (thread) => {
      setThreadList(prev => [...prev, thread])
    })
    socket.on('notify_new_msg', (threadId, msg) => {
      setThreadList(prev =>
        prev.map(thread => {
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
  }, [])

  var inner
  switch (view) {
    case "threadlist":
      inner = <ThreadList threadList={threadList} toThread={(threadId) => { setThreadId(threadId); setView("thread") }} toCreator={() => { setThreadId(null); setView("threadcreator") }} />
      break;
    case "thread":
      inner = <Thread thread={threadList.filter(t => t.id === threadId)[0]} socket={socket} back={() => setView("threadlist")} subthread={() => setView("threadcreator")} toThread={(threadId) => { setThreadId(threadId); setView("thread") }} />
      break;
    case "threadcreator":
      inner = <ThreadCreator socket={socket} parentId={threadId} back={() => setView("threadlist")} />
      break;
    default:
      inner = <p>Error : Wrong view name selected</p>
      break;
  }

  return inner;
}

export default Chat;