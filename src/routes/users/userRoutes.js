import { Signup, SignIn } from '../../controllers/user'
import passportStrategy from '../../services/passportStrategy'

import passport from 'passport'

const requireSignIn = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

const userRoutes = (app) => {
  // index route
  app.get('/api/users/', requireAuth, (req, res) => {
    res.send({message: 'Contempo-node-api'})
  })

  app.post('/api/user/signin', requireSignIn, SignIn)

  app.post('/api/user/signup', Signup)
}

export default userRoutes
