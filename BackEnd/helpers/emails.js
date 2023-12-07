import nodemailer from "nodemailer";

//  "DATOS" es un objeto que recibe de la variable datos la informacion del usuario
export const emailRegistro =async(datos) =>{
console.log("DATOS",datos);
const{email,nombre,token} = datos;
// integracion de nodemailer informada en Mailtrap en la lista desplegable de Integratios
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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

export const emailOlvidePassword =async(datos) =>{
  console.log("DATOS",datos);
  const{email,nombre,token} = datos;
  // integracion de nodemailer informada en Mailtrap en la lista desplegable de Integratios
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });
  
  
  
  const info = await transport.sendMail({
    from:'"Servicio Social" <cuentas@ServicioSocial.com>',
    to:email,
    subject: "Servicio Social - Reestablecer tu password",
    text: "Comprueba tu cuenta en el servicio social ",
    // "`" Template string
    html: `<p> Hola ${nombre}<p>
    <p>Recupera tu password en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    `,
  })
  };
  


