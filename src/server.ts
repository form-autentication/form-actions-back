import express from "express";
import config from "./config";
import app from "./index";

const startServer = async () => {
   app.listen(config.port, () =>
      console.log(`Esta conectado en el puerto ${config.port}`)
   );
};

startServer();
