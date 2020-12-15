import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Usuarios } from "../models/schema";

const createUsers = (req: Request, res: Response, next: NextFunction) => {
   const user = new Usuarios(req.body);

   user
      .save()
      .then((result) => {
         console.log("Los datos enviados si se añadieron a la BD", result);
      })
      .catch((error) =>
         console.error("No se gurdaron los datos enviados" + error)
      );

   next();
};

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
