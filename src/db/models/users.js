import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';
const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: ROLES.AUTOR,
    },
  },
  { timestamps: true, versionKey: false },
);
export const UserCollection = model('user', usersSchema);
