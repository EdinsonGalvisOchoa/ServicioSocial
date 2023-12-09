// vamos a tener en este archivo todo lo relacionado con la autenticacion en el useState
// vamos a tener algunas funciones que corren cuando carge el componente  con el useeffect

import { useState, useEffect, createContext } from "react";
// useNavigate otra forma de redireccionar el usuario importar el hooks de navigate
import { useNavigate }from "react-router-dom"
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();
// nuestro Provider(de donde vienen los datos) rodea toda la aplicacion y como rodea toda la aplicacion le pasamos children que van a ser todos los componentes
//para que este disponible toda la informacion en los demas componentes

const AuthProvider = ({ children }) => {
  // state llamado auth para almacenar todo el objeto json que devuelve la funcion comprobar password
  const [auth, setAuth] = useState({});
  // State para que espere a que se consulte en la Api la autenticacion del usuario
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate()

  //useeffect  de una sola ejecucion"[]"", donde intenta  validar que exista un token el local storage y validar el usuario

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      // Bearer token , configuracion necesaria para la autenticacion, se envia primero el jwt en los headers se envia , se comprueba y si esta correcto procede a traer el perfil
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // se procede a autenticar al usuario via jwt con el middleware de autenticacion
      try {
        const { data } = await clienteAxios.get("/usuarios/perfil", config);
        setAuth(data);

        navigate("/proyectos")
      } catch (error) {
        setAuth({});
     }
      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({})

  }

  return (
    // informacion que va a estar disponible en los demas componentes
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
