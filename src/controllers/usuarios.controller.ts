import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Usuarios } from "../models/schema";

/**
 * Buscar si existe o no ese usuario
 */
const getUser = async (email: string): Promise<boolean> => {
   const flag = await Usuarios.find({ email: email });

   if (flag === undefined || flag == null || flag.length <= 0) {
      return true;
   } else {
      return false;
   }
};

/**
 * Verificar si tiene @gmail.com o no
 */
const verifyText = (word: string, keyWord: string): boolean => {
   let position = word.indexOf(keyWord);

   if (position !== -1) {
      return true;
   }

   return false;
};

/**
 * Crear Usuarios
 */
const createUsers = async (req: Request, res: Response, next: NextFunction) => {
   let { email, password } = req.body;

   verifyText(req.body.email, "@gmail.com")
      ? (email = email)
      : (email = `${email}@gmail.com`);

   let flag = await getUser(email);

   if (flag) {
      const user = new Usuarios({ email, password });

      user
         .save()
         .then((result) => {
            console.log("Los datos enviados si se añadieron a la BD", result);
         })
         .catch((error) =>
            console.error("No se gurdaron los datos enviados" + error)
         );

      next();
   } else {
      console.log("Ya tiene ese mismo dato");
   }
};

/**
 * Traer todos los usuarios existentes
 */
const getAllUsers = (res: Response) => {
   Usuarios.find()
      .exec()
      .then((results) => {
         console.log(results);

         res.json(results);
      })
      .catch((error) => {
         console.error(`No hay datos en la BD:  ${error}`);
      });
};

export { getAllUsers, createUsers };
