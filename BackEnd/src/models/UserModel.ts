import mongoose, { Schema } from "mongoose";
import { Iuser } from "../interface/IUser";

const useSchama: mongoose.Schema = new Schema<Iuser>({
  name: {
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
  imageUrl: {
    type: String,
    required: false,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const UserModel = mongoose.model<Iuser>('user',useSchama)
