import { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createUsers, getAllUsers } from "../controllers/usuarios.controller";
import config from "../config/config";

export class Routes {
   public portFront: String = config.portFront;

   public allowlist: String = "http://localhost:3000";

   constructor() {}

   public routes(app: any): void {
      app.route("/").get(cors(), (req: Request, res: Response) => {
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
            res.send("Desde el el Quotes");
         });

      app.route("/login")
         .post(() =>
            console.log("Se llamo a la pagina login con el metodo POST")
         )
         .get(() =>
            console.log("Se llamo a la pagina login con el metodo GET")
         );
   }
}
