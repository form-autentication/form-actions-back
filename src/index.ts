import express from "express";
import dotenv from "dotenv";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { error } from "console";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

MongoClient.connect(
   "mongodb+srv://form-actions:form-actions@cluster0.huo7v.mongodb.net/form-actions?retryWrites=true&w=majority",
   {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   }
)
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

app.listen(port, () => console.log(`Esta conectado en el puerto ${port}`));
