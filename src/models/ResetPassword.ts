import { Schema, model } from 'mongoose';

interface IResetPassword {
  user: Schema.Types.ObjectId;
  token: string;
  expires: Date;
}

const resetPasswordSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

export const ResetPassword = model<IResetPassword>('reset-password', resetPasswordSchema);

export default {};
