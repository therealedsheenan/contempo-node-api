
const index = function (app) {
  app.get('/api/', function (req, res) {
    res.send({ message: 'Hello from index!!!' })
  })
}

module.exports = index
