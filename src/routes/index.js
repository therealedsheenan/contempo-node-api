import getUsers from './users/get'

const routes = function (app) {
  getUsers(app)
}

module.exports = routes
