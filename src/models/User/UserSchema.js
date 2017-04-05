import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

UserSchema.pre('save', function (next) {
  let user = this

// only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

// generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the clear text password with the hashed one
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

export default mongoose.model('user', UserSchema)
