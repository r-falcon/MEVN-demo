/**
 * 使用passport、passport-jwt中间件来验证token
 */
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
