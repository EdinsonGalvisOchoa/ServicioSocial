import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"


const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);

  // funcion que va a tomar un string con la url que se va a enviar el usuario
  const navigate = useNavigate();
  const {auth} = useAuth();

  useEffect(() => {
    const obtenerproyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return(console.log("No hay token"))
        
        ;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/proyectos", config);
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerproyectos();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  // creando el proyecto en la base de datos
  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }

    return;
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      // sincronizar el state
      // data es la informacion que viene de la base de datos y proyectoState es la informacion que esta en mmeoria en el state
      // por eso se debe mapear o recorrer todos los proyectos para identificar cual se actualizo y asi mostrar elñ proyecto en base de datos
      // y si no mostrar el proyecto que esta en memoria , luego de eso actualizar el stateProyectos el proyecto actualizado

      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);

      // mostrar la alerta

      setAlerta({
        msg: "Proyecto actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos"); // paso para que muestre los proyectos luego de que se cree un p´royecto correrctamnete
      }, 3000);

      // redireccionar
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      // Esto se hacer para que el ultimpo proyecto creado se vea en la lista de proyectos sin que se necesite recargar la pagina
      // "...proyectos" significa que tomamos una copia y le añadimos data al final (el ultimo proyecto creado)
      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos"); // paso para que muestre los proyectos luego de que se cree un p´royecto correrctamnete
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
      console.log(data)
      setProyecto(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  const eliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      console.log(data);

      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos"); // paso para que muestre los proyectos luego de que se cree un p´royecto correrctamnete
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if(tarea?.id){
      await editarTarea(tarea)
    }else{
      await crearTarea(tarea)
    }
    
  };

  // para no psar el setTarea se crea otra funcion
  const handleModalEditarTarea = (tarea) => {
    console.log(tarea);
    //colocamos la tarea seleccionada en el state
    setTarea(tarea);
    // setear el modal para que se abra
    setModalFormularioTarea(true);
  };


  const crearTarea = async tarea =>{
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);
      //agrega la tarea al state , primero se toma una copia del proyecto
      const proyectosActualizado = { ...proyecto };
      proyectosActualizado.tareas = [...proyecto.tareas, data];

      setProyecto(proyectosActualizado);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  }

  const editarTarea = async tarea =>{
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config);
      // actualizando el dom
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState )
      
      
      setProyecto(proyectoActualizado)

      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  }
  

  const handleModalEliminarTarea = tarea =>{
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }

  const eliminartarea = async () => {
    try {

      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`,config);
      setAlerta({
        msg:data.msg,
        error:false
      });
      // actualizando el dom
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter((tareaState) => tareaState._id !== tarea._id);
      
      setProyecto(proyectoActualizado);

      setModalEliminarTarea(false);
      setTarea({})     
      setTimeout(() => {
        setAlerta({});
        
      }, 3000);

      
    } catch (error) {
      console.log(error)
      
    }
  }

  const  cerrarSesionProyectos = ()=>{
    setProyectos([])
    setProyecto({})
    setAlerta({})

  }
  

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminartarea,
        cerrarSesionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
