import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt, faCheckSquare, faDollarSign, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import Chat from './Chat'

function App() {
  const [main, setMain] = useState("chat")

  var content
  switch (main) {
    case "chat": {
      content = <Chat />
    }
  }

  return (
    <div className="App">
      <div className="sidebar">
        <FontAwesomeIcon icon={faCommentAlt} size="3x" fixedWidth />
        <FontAwesomeIcon icon={faCheckSquare} size="3x" fixedWidth />
        <FontAwesomeIcon icon={faDollarSign} size="3x" fixedWidth />
        <FontAwesomeIcon icon={faMapMarkedAlt} size="3x" fixedWidth />
      </div>
      <div className="main">{content}</div>
    </div>
  )
}

export default App;
