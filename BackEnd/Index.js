import express from "express";
import dotenv from "dotenv";// Importacion de la dependencia para poder utilizar las varuiables de entorno
import conectarDB from "./config/database.js"; // Importacionn del archivo quye contiene la funcion para conectarse a la base de datos
import usuarioRoutes from "./routes/usuariosRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"
import cors from "cors";



const app = express();
app.use(express.json());// manejar los archjivos de respuesta de json con express, antes se hacia con body parse
dotenv.config(); // funcion que va a buscar por un archivo .env para utilizar las variables de entorno
conectarDB();
//Configuracion de cors (WhiteList: quie dominios  estan permitidos para conectarse)
const whitelist = ["http://localhost:5173"] // dominio permitido
const corsOptions={
  //origin : cual es el origen del request , quien esta enviando el request
  origin: function(origin, callback){
    if(whitelist.includes(origin)){

      // Puede consultar la Api
      callback(null,true); // null porque no hay mensaje de error pero si le damos el acceso con un true

    }else{
      // No esta permitido conectaerse a la Api
      callback(new Error("Error de Cors"));

    }
  },
};

app.use(cors(corsOptions));

// Routing se hace en express utilizando request(req: lo que envias al servidor) y response(resp:lo que recibes del servidor)
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
