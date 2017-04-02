import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

UserSchema.methods = {

}

export default mongoose.model('user', UserSchema)
