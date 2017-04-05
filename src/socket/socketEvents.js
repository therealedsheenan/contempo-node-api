const socketEvents = (io) => {
  io.on('connection', function (socket) {
    console.log('client connected')
    socket.on('login', (data) => {
      console.log(data)
      console.log('User Login Request')
    })

    socket.on('signup', (data) => {
      console.log(data)
      console.log('User Signup Request')
    })

    socket.on('signup-success', (data) => {
      console.log('signup successful!')
      io.emit('signup-success', data)
    })
  })
}

export default socketEvents
