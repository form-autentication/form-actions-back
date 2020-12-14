import express from "express";
import bodyParse from "body-parser";
import { MongoClient } from "mongodb";
import config from "./config";

const startServer = async () => {
   const app = express();

   MongoClient.connect(config.databaseURL as any, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   })
      .then((client) => {
         const db = client.db("form-actions");

         const quotesCollection = db.collection("quotes");

         app.post("/quotes", (req, res) => {
            quotesCollection
               .insertOne(req.body)
               .then((result) => {
                  console.log(result);
                  res.redirect("/");
               })
               .catch((error) => console.error(error));
         });

         // console.log("Conected database: ", db);
      })
      .catch((error) => console.error(error));

   app.use(bodyParse.urlencoded({ extended: true }));

   app.get("/", (req, res) => {
      res.send("Si funciono correctamente desde mi casa");
   });

   app.listen(config.port, () =>
      console.log(`Esta conectado en el puerto ${config.port}`)
   );
};

startServer();
