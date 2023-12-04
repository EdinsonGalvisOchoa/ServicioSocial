import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Dependencia para realizar el hasheo de los password y nos permite comprobar un string con un password ya haseado


const usuariosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    userType: {
      type: String,
      require: true,
      trim: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // crea dos columnas mas , una llamada creada y otra actualizada
);

usuariosSchema.pre("save",async function(next){

  if (!this.isModified("password")){
    next();// si no esta modificando el password no haga nada
  }
  const salt = await bcrypt.genSalt(10); // El bcrypt es de 10 rondas , entre mas rondas tenga vas a estar mas seguro pero consume mas recursos en el servidor
  this.password = await bcrypt.hash(this.password,salt);
}); // se va a ejecutar antes de almacenar en la base de datos

usuariosSchema.methods.comprobarPassword = async function(passwordFormulario){
  return await bcrypt.compare(passwordFormulario, this.password)// comprobar un string hasseado con uno que no esta hasseado retorna true o false
};

const Usuario = mongoose.model("Usuario", usuariosSchema);
export default Usuario;
