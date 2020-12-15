import mongoose, { Schema, model } from "mongoose";
import { IUsuarios } from "../interfaces/users.interface";

const UsuarioSchema: Schema = new Schema({
   email: {
      type: String,
   },
   password: {
      type: String,
   },
});

export const Usuarios = model<IUsuarios>("usuarios", UsuarioSchema);
