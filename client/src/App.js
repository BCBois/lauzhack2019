import React, {useState} from 'react';
import './App.css';
import openSocket from 'socket.io-client'

const socket = openSocket('http://192.168.43.55:12345/');

function App() {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  socket.on('chat_message', (msg) => setMessages([...messages, msg]))

  const list = messages.map(m => <p>{m}</p>)

  return (
    <div className="App">
      <div id="messages_list">
        {list}
      </div>
      <div id="textbox">
        <div className="textinput">
          <textarea onChange={event => setText(event.target.value)}></textarea>
        </div>
        <button onClick={() => {
          socket.emit('chat_message', text)
        }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
