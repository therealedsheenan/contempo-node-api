import mongoose from 'mongoose'
import bcrypt from 'bycrypt-nodejs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

export default UserSchema
