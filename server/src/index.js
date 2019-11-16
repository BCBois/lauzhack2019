const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 12345

app.get('/', function (req, res) {
  res.send('Hello Lauzhack!')
})

http.listen(port, function () {
  console.log('Running on ' + port)
})

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('chat_message', function(msg){
        console.log('message: ' + msg)
        io.emit('chat_message', msg)
    })
    socket.on('disconnect', function(){
      console.log('user disconnected')
    })
    
})