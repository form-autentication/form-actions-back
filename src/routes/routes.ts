import { NextFunction, Request, Response } from "express";
import cors from "cors";
import {
   createUsers,
   getAllUsers,
   verifyUser,
} from "../controllers/usuarios.controller";
import config from "../config/config";

export class Routes {
   public portFront: String = config.portFront;

   constructor() {}

   public routes(app: any): void {
      app.route("/profile").get(cors(), (req: Request, res: Response) => {
         getAllUsers(res);
      });

      app.route("/create")
         .post(
            createUsers,
            (req: Request, res: Response, next: NextFunction) => {
               res.json({ message: "se añadieron correctatmente" });
               res.redirect(`${this.portFront}/`);
            }
         )
         .get((req: Request, res: Response) => {
            res.send("Desde e l el Quotes");
         });

      app.route("/login")
         .post(
            verifyUser,
            (req: Request, res: Response, next: NextFunction) => {
               console.log("Se llamo a la pagina login con el metodo POST");
               res.json({ msg: "Si se llamo al login" });
            }
         )
         .get(() =>
            console.log("Se llamo a la pagina login con el metodo GET")
         );
   }
}
