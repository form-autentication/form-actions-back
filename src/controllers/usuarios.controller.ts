import { Request, Response, NextFunction } from "express";
import { Usuarios } from "../models/schema";

/**
 * Buscar si existe o no ese usuario
 */
const getUser = async (email: string, password?: string): Promise<boolean> => {
   let flag;

   if (password) {
      flag = await Usuarios.find({
         email: email,
         password: password,
      });
   } else {
      flag = await Usuarios.find({
         email: email,
      });
   }

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
   let flag;
   let { name, email, password } = req.body;

   verifyText(req.body.email, "@gmail.com")
      ? (email = email)
      : (email = `${email}@gmail.com`);

   flag = await getUser(email);

   if (flag) {
      const user = new Usuarios({ name, email, password });

      user
         .save()
         .then((result) => {
            console.log("Los datos enviados si se añadieron a la BD", result);
         })
         .catch((error) =>
            console.error("No se gurdaron los datos enviados" + error)
         );
   } else {
      res.json({ mssg: "Ya tiene ese mismo dato" });
      console.log("Ya tiene ese mismo dato");
   }
};

/**
 * Verificar los usarios existentes
 */
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
   let flag;

   let { email, password } = req.body;

   verifyText(req.body.email, "@gmail.com")
      ? (email = email)
      : (email = `${email}@gmail.com`);

   flag = await getUser(email, password);

   if (flag) {
      res.json({ mssg: "No exsite el Usario", flag: false });

      console.log("No existe el usuario");
   } else {
      res.json({ mssg: "Si existe es usario", flag: true });

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
         // res.json({ msg: "Si se acepto la solicitud for the page Profile" });
         res.send(results);
         // console.log(results);
      })
      .catch((error) => {
         console.error(`No hay datos en la BD:  ${error}`);
      });
};

export { getAllUsers, createUsers, verifyUser };
