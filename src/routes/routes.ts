import { NextFunction, Request, Response } from "express";
import { createUsers, getAllUsers } from "../controllers/usuarios.controller";
import config from "../config/index";

export class Routes {
   public portFront: String = config.portFront;

   public routes(app: any): void {
      app.route("/").get((req: Request, res: Response) => {
         // res.send("Hello world of the Home");
         getAllUsers(res);
      });

      app.route("/quotes")
         .post(
            createUsers,
            (req: Request, res: Response, next: NextFunction) => {
               res.redirect(`${this.portFront}/`);
            }
         )
         .get((req: Request, res: Response) => {
            res.send("Desde el el Quotes");
         });
   }
}
