import { Document } from "mongoose";

export interface IUsuarios extends Document {
   email: string;
   password: string;
}
