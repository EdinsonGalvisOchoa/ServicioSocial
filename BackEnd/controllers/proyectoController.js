import Proyecto from "../models/proyectoModel.js";
import Tarea from "../models/tareaModel.js";

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyectos = async (req, res) => {

  // .select("-tareas") es para que no se traiga las tareas de los proyectos ya que en la pestaña de proyectos no es necesaria
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario).select("-tareas");
  return res.json(proyectos);
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  // con el metodo populate se extrae no solo el id si no todos los datos de las tareas , es asi como se vincula muchas tareas a un solo proyecto
  const proyecto = await Proyecto.findById(id).populate("tareas");
  if (!proyecto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }

  


  res.json(proyecto);
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }
  proyecto.nombre = req.body.nombre ||proyecto.nombre;
  proyecto.descripcion = req.body.descripcion ||proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega ||proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente ||proyecto.cliente;

  try {    
    const proyectoAlmacenado = await proyecto.save();

    // al retornar un res.json se deveuelve siempre la integridad de los dastos al devolver lo que esta en la base de datos no lo que esta en la memoria
    // ni lo que esta en el state
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
    
  }


};
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }

  try {    
    await proyecto.deleteOne();
    res.json({msg:"Proyecto Eliminado"});
  } catch (error) {
    console.log(error);    
  }


};
const asignarColaborador = async (req, res) => {};
const eliminarColaborador = async (req, res) => {};
const obtenerTareas = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  asignarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
