const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes')

const httpServer = express()
const server = require('http').Server(httpServer)
const io = require("socket.io")(server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query

    connectedUsers[user] = socket.id
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-einqo.mongodb.net/omni8?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

httpServer.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
  
    return next()
});

httpServer.use(cors())
httpServer.use(express.json())
httpServer.use(routes)

server.listen(3333)


