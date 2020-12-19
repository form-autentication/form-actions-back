import { Document } from "mongoose";

export interface IUsuarios extends Document {
   name?: string;
   email: string;
   password: string;
}
