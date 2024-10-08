import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
}
interface UserModel extends mongoose.Model<IUser> {
  findAndValidate(email: string, password: string): Promise<IUser | false>;
}
const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser, UserModel>("User", userSchema);
