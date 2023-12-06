  import { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import axios from "axios"; 
  import Alertas from "../components/Alertas";


  const ConfirmarCuenta =  () => {

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada,setCuentaConfirmada] = useState(false)

    const params =  useParams();
    const {id} = params
    //console.log(params); se duplica la solicitud error

    useEffect(()=>{
      const confirmarCuenta = async () => {

        try {
          const url =`http://localhost:4000/api/usuarios/confirmar/${id}`
          const { data } = await axios(url)// ES DE TIPO GET Y ESTE ESTA POR DEFECTO 
          setAlerta({
            msg:data.msg,
            error:false
          })  
          setCuentaConfirmada(true)        
        } catch (error) {
          setAlerta({
            msg:error.response.data.msg,
            error:true
          })
          
        }


      } 
      
      confirmarCuenta();



    },[]) // le pasamos el arreglo de depéndiencias vacio para que se ejecte una sola vez ya que elñ token es de una sola vez
    const {msg} = alerta



          //  Para el return si existe msj &&(entonces retorna lo siguiente)y le enviamos alerta 
          // si cuentaConfirmada es = true entonces retorla el link de iniciar sesion
    return (
        <>
          <h1 className="text-sky-600 font-black text-6xl capitalize">Cuenta Confirmada!!</h1>  

          <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alertas alerta = {alerta} />}
            {cuentaConfirmada &&
            <Link className="block text-center my-5 text-state-500 uppercase text-sm" to="/">Inicia Sesión</Link> 
            }
             </div> 

          
          
                  
        </>
      );
  
}

export default ConfirmarCuenta