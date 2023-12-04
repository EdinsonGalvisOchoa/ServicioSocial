
import mongoose from "mongoose";// String de conexion y el codigo para conectarnos a la base de datos con mongoose
import connection from "mongoose";

// Funcion para conecarte a la base de datos
const conectarDB = async () => {
  try {
    const conection = await mongoose.connect( // metodo de mongoose para conectarse auna base de datos
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conectado en : ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);// para forzar que el proceso termine de forma asincrona
  }
};

export default conectarDB;
