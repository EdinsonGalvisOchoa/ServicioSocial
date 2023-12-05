import{useEffect, useState} from "react"; // useEffect para enviar una peticion
import{useParams, Link } from "react-router-dom"
import{axios} from "axios"
import Alerta from "../components/Alertas"


 // gracias al /:id que esta en App.jsx podemos leer con params el id que se encuentra en la url
 

    const confirmarCuenta = async () => {
      const params = useParams();
      const {id} = params;



      useEffect(()=>{
        const confirmarCuenta = async() =>{
          try {

            const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
            const{data} = await axios.get(url)
            
          } catch (error) {
            console.log(error)
          }



        }

        confirmarCuenta();



      },[])






    return (
        <>
          <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta</h1>   
        </>
      );
  
}

export default confirmarCuenta