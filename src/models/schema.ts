import mongoose, { Schema, model } from "mongoose";
import { IUsuarios } from "../interfaces/users.interface";

const UsuarioSchema: Schema = new Schema({
   name: {
      type: String,
   },
   email: {
      type: String,
   },
   password: {
      type: String,
   },
});

export const Usuarios = model<IUsuarios>("users", UsuarioSchema);
