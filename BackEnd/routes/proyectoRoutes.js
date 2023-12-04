import  express  from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  asignarColaborador,
  eliminarColaborador,
  obtenerTareas,
} from "../controllers/proyectoController.js";


const router = express.Router();

router.get("/", checkAuth,obtenerProyectos);
router.post("/", checkAuth,nuevoProyecto);
router.get("/:id", checkAuth,obtenerProyecto);
router.put("/:id", checkAuth,editarProyecto);
router.delete("/:id", checkAuth,eliminarProyecto);
router.get("/tareas/:id",checkAuth,obtenerTareas);
router.post("/agregar-colaborador/:id",checkAuth,asignarColaborador);
router.post("/eliminar-colaborador/:id",checkAuth,eliminarColaborador);


export default router