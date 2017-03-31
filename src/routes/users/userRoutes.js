const userRoutes = (app) => {

  // index route
  app.get('/api/users/', (req, res) => {
    res.send({ message: 'Contempo-node-api' })
  })

  app.post('/api/user/signin', (req, res) => {
    res.send({ message: 'signin' })
  })

  app.post('/api/user/signup', (req, res) => {
    res.send({ message: 'signup' })
  })
}

export default userRoutes
