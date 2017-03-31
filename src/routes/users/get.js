
const get = (app) => {
  app.get('/api/users/', function (req, res) {
    res.send({ message: 'Contempo-node-api' })
  })
}

export default get
