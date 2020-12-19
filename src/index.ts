import express, { Request, Response, NextFunction, Router } from "express";
import bodyParse from "body-parser";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import config from "./config/config";
import { Routes } from "./routes/routes";
import cors from "cors";

class App {
   public app: express.Application = express();

   public routerPrv: Routes = new Routes();

   public mongoURL: any = config.databaseURL;

   public db: any;

   constructor() {
      this.configuration();
      this.mongodbSetup();
      this.routerPrv.routes(this.app);
   }

   /**
    * Configuration in middlewares
    */
   private configuration(): void {
      this.app.use(bodyParse.json());
      this.app.use(bodyParse.urlencoded({ extended: true }));

      this.app.use((req: Request, res: Response, next: NextFunction) => {
         res.header("Access-Control-Allow-Origin", "*");

         res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
         );
         next();

         // this.app.options("*", (req: Request, res: Response) => {
         //    res.header(
         //       "Access-Control-Allow-Methods",
         //       "GET, PATCH, PUT, POST, DELETE, OPTIONS"
         //    );
         //    res.send();
         // });
      });
   }

   /**
    * Conect to Moongodb
    */
   private mongodbSetup(): void {
      mongoose.connect(this.mongoURL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });

      this.db = mongoose.connection;
      this.db.on("error", console.error.bind(console, "Conection error: "));
      this.db.once("open", () => {
         console.log("Se conecto a la base de datos");
      });
   }
}

export default new App().app;
