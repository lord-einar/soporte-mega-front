const io = require('socket.io-client')

let socket = io('//localhost:8080')

export default socket;