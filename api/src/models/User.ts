import { Schema, model } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfCreating: Date;
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfCreating: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>('users', UserSchema);

export default {};
