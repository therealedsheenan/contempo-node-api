import mongoose from 'mongoose'
import { hashPassword } from './utils/hashPassword'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

UserSchema.pre('save', function (next) {
  hashPassword(this.password, (err, hash) => {
    if (err) { return err }
    // assign generated hash to newUser
    this.password = hash
  })
  next()
})

export default mongoose.model('user', UserSchema)
