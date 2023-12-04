import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },

    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId, // Con esto relacionamos la collecion de usuarios con la coleccion de proyecto, ya que el creador va a ser el unico que puede asignar o crear tareas
      ref: "Usuario", // Creador es un objeto ya que solo puede haber un creador de una tarea
    },
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId, // Con esto relacionamos la collecion de usuarios con la coleccion de proyecto, ya que el creador va a ser el unico que puede asignar o crear tareas
        ref: "Usuario",
      }, // los corchetes significa que es un arreglo usuarios es decir pueden haber multyiple colabores en una misma tarea
    ],
  },

  { timestamps: true }
);


const Proyecto = mongoose.model("Proyecto", proyectosSchema);
export default Proyecto;