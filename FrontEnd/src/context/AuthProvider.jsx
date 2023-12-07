// vamos a tener en este archivo todo lo relacionado con la autenticacion en el useState
// vamos a tener algunas funciones que corren cuando carge el componente  con el useeffect


import { useState, useEffect, createContext} from "react"


const AuthContext = createContext();
// nuestro Provider(de donde vienen los datos) rodea toda la aplicacion y como rodea toda la aplicacion le pasamos children que van a ser todos los componentes 
//para que este disponible toda la informacion en los demas componentes

const AuthProvider =({children}) => {

  
   // state llamado auth para almacenar todo el objeto json que devuelve la funcion comprobar password
     const[ auth, setAuth] = useState({})


     //useeffect  de una sola ejecucion"[]"", donde intenta  validar que exista un token el local storage y validar el usuario

     useEffect(()=>{
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")

            if(!token){
                console.log("No hay token")

            }
            console.log("Si hay token")

        }

        autenticarUsuario()

     },[])



    return(
        // informacion que va a estar disponible en los demas componentes
        <AuthContext.Provider
        value = {{         
            setAuth

        }}
        
        >
            {children}
        </AuthContext.Provider>
    )

}

export{
    AuthProvider
}

export default AuthContext;