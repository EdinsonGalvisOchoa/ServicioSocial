import { useState } from "react";
import { Link } from "react-router-dom";
import Alertas from "../components/Alertas"
import axios from "axios" //    Comunicarnos desde react hacia el backend por medio de axios



const Registrar = () => {

    const [ nombre, setNombre] = useState('')
    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [ repetirPassword, setRepetirPassword] = useState('') 
    const [ alerta, setAlerta] = useState({})


    // prevenir la accion por defecto , la cual es enviar lo que haya en el formulario sin realizar algun tipo de validacion
        // validacion de campos obligatorios, los corchetes son para convertir los string en un array
        // podemos acceder al metodo incluides gracias a [], valida que todos esten diligenciados
            // se a seteado la alerta 
            
    const handleSubmit = async e =>{
       
        e.preventDefault(); 
        if([nombre, email, password, repetirPassword].includes('')){ 
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            
            return
        } 
        if(password !== repetirPassword){ 
            setAlerta({
                msg: "Los password no son iguales",
                error: true
            })
            
            return
        }   
        
        if(password.length < 6){ 
            setAlerta({
                msg: "El password debe tener minimo 6 caracteres",
                error: true
            })
            
            return
        }     
        
        setAlerta({}); // si todo esta bien se setea la alerta a vacio

        try {
            const{  data }= await axios.post("http://localhost:4000/api/usuarios",{nombre, email, password})
            setAlerta({
                msg: data.msg,
                error: false
            });
           // si el codigo se ejecuto hasta aqui significa que ya se creo el usuario por lo tanto seteam,os todas las variables a vacio
           setNombre("")
           setEmail("")
           setPassword("")
           setRepetirPassword("")
        } catch (error) {

            setAlerta({
                msg: error.response.data.msg,// Con .response de axios se puede acceder a los mensajes de error  
                error: true
            });
                    
        }
    }

    const { msg } = alerta


    return (
        <>
          <h1 className="text-sky-600 font-black text-6xl capitalize">Registrate</h1>
          { msg && <Alertas alerta={alerta}/>}
    
          <form className="my-10 bg-white shadow rounded-lg p-10" 
          onSubmit={handleSubmit}
          >
          <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlfor="email" >Nombre</label>
                <input id="nombre"type="text" placeholder="Digite tu nombre y apellidos" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={nombre} onChange={e=>setNombre(e.target.value)}/>
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlfor="email" >Email</label>
                <input id="email"type="email" placeholder="email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlfor="password">Password</label>
                <input id="password"type="password" placeholder="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlfor="password">Repetir Password</label>
                <input id="password2"type="password" placeholder="Repetir tu password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"value={repetirPassword} onChange={e=>setRepetirPassword(e.target.value)}/>
            </div>
            <input type="Submit" value="Crear cuenta" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
          </form>
          <nav className="lg:flex lg:justify-between">
    
           <Link className="block text-center my-5 text-state-500 uppercase text-sm" to="/">Ya tienes una cuenta? Inicia Sesión</Link>
           <Link className="block text-center my-5 text-state-500 uppercase text-sm" to="/olvide-password">Olvide mi password</Link>
    
    
          </nav>
    
    
        </>
      );
  
}

export default Registrar