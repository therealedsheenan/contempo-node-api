import userRoutes from './users/userRoutes'

const routes = function (app) {
  userRoutes(app)
}

module.exports = routes
