import express  from "express";
import {registrar,autenticar, confirmar,olvidePassword, comprobarToken,nuevoPassword,perfil} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js"
const router = express.Router(); // variable para definir get,path etc
// Routing se hace en express utilizando request(req: lo que envias al servidor) y response(resp:lo que recibes del servidor)
// Autentiocacion , registro y confirmacion de usuarios


router.post("/", registrar); // Crear un nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token",confirmar) // los dos puntos antes del token sirven para indicarle al sistema que genera un router dinamico con express
router.post("/olvide-password",olvidePassword)
router.get("/olvide-password/:token",comprobarToken)
router.post("/olvide-password/:token",nuevoPassword)

router.get("/perfil",checkAuth, perfil);





export default router
