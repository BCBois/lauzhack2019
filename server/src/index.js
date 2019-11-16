const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

http.get('/', function (req, res) {
  res.send('Hello Lauzhack!')
})

http.listen(12345, function () {
  console.log('Running on 3000')
})

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('chat_message', function(msg){
        console.log('message: ' + msg)
    })
    socket.on('disconnect', function(){
      console.log('user disconnected')
    })
})