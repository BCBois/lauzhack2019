const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const db = require('./database')
const fs = require('fs')

const port = 12345

http.listen(port, function () {
  console.log('Running on ' + port)
})

io.on('connection', function(socket) {
    console.log('a user connected')

    socket.on('disconnect', function() {
      console.log('user disconnected')
    })

    socket.on('get_all_threads', function(answer) {
      console.log('called get_all_threads')
      db.getAllThreads().then(result => answer(result))
    })

    socket.on('create_thread', function(thread) {
      console.log('called create_thread')
      // Take thread and add it to DB
      db.createThread(thread)
      // Notify all clients
      io.emit('notify_new_thread', thread)
    })

    socket.on('create_msg', function(threadID, msg) {
      console.log('called create_msg')
      // Call database to save msg
      db.createMessage(threadID, msg)
      // Notify all clients (broadcast)
      io.emit('notify_new_msg', threadID, msg)
    })
})

app.get('/', function (req, res) {
  fs.readFile('test/test.html', {encoding: 'utf-8'}, (err, data) => {
    console.log(data)
    res.send(data)
  })
})