import Usuario from "../models/UsuarioModel.js";
import generarid from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro,emailOlvidePassword} from "../helpers/emails.js"

const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email: email }); // Va a buscar el email dentro de la base de datos
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado"); // El mensaje que va a salir
    return res.status(400).json({ msg: error.message }); // retorna el mensaje al usuario
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarid();
    const usuarioAlmacenado = await usuario.save();
    // Se envia los datos basicos del usuario a la funcion emailRegistro para asi poder enviar con esos datos el email de confirmacion
    emailRegistro({
      
      
      email:usuario.email,
      nombre: usuario.nombre,
      token:usuario.token
    
    })
    res.json({msg:"Usuario creado correctamente, revisa tu email para confirmar tu cuenta"});
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar que existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message }); //error 404 es el error de no encontrado
  }
  // Comprobar si el usuario no esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message }); //error 404 es el error de no encontrado
  }

  //comprobar su password y dar acceso
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params; // leer de la URL
  const usuarioConfirmar = await Usuario.findOne({ token }); // Buscamos a un usuario con ese token
  if (!usuarioConfirmar) {
    // si no exiuste "Token no valido"
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    // si existe el usuario con el token

    usuarioConfirmar.confirmado = true; // Confirmamos el usuario
    usuarioConfirmar.token = ""; // Borramos el token ya que es de un solo uso
    await usuarioConfirmar.save(); // guardamos en la base de datos
    res.json({ msg: "Usuario Confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message }); //error 404 es el error de no encontrado
  }
  try {
    usuario.token = generarid();
    await usuario.save();

    // Enviar email con instrucciones
    emailOlvidePassword({

      email:usuario.email,
      nombre: usuario.nombre,
      token:usuario.token

    })
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Token valido el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token}); 
  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Password Modificado correctamente" });
    } catch (error) {
      console.log(error);
    }

  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }


};

const perfil = async (req, res) => {
  const {usuario} = req;res.json(usuario);


};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
