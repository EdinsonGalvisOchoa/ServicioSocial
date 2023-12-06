import nodemailer from "nodemailer";

//  "DATOS" es un objeto que recibe de la variable datos la informacion del usuario
export const emailRegistro =async(datos) =>{
console.log("DATOS",datos);
const{email,nombre,token} = datos;
// integracion de nodemailer informada en Mailtrap en la lista desplegable de Integratios
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "137a8125b0e45d",
    pass: "1c6abfb6581a28",
  }
});

const info = await transport.sendMail({
  from:'"Servicio Social" <cuentas@ServicioSocial.com>',
  to:email,
  subject: "Servicio Social - confirma tu cuenta",
  text: "Comprueba tu cuenta en el servicio social ",
  // "`" Template string
  html: `<p> Hola ${nombre}<p>
  <p>Tu cuenta ya esta casi lista. solo debes comprobarla en el siguiente enlace:
  <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
  `,
})
};


