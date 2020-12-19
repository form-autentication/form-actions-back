import express from "express";
import cors from "cors";
import config from "./config/config";
import app from "./index";

const startServer = async () => {
   app.listen(config.port, () =>
      console.log(`Esta conectado en el puerto ${config.port}`)
   );
};

startServer();
