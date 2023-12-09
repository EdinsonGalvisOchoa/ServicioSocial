import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Tarea from "../components/Tarea";
import Alertas from "../components/Alertas";

const Proyecto = () => {
  const params = useParams();
  // con esta linea se esta opbteniendo la funcion obtener proyectos del context a traves del hook llamado useProyectos
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } =
    useProyectos();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const { nombre } = proyecto;

  if (cargando) return "Cargando...";

  const { msg } = alerta;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>

          <Link
            to={`/proyectos/editar/${params.id}`}
            className="uppercase font-bold"
          >
            Editar
          </Link>
        </div>
      </div>
      <button
        onClick={handleModalTarea}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
        Crear tarea
      </button>

      <p className="Font-bold text-xl mt-10 font-bold">Tareas del proyecto</p>

      <div className=" flex justify-center">
        <div className="w-full md:1/3 lg:w-1/4">{msg && <Alertas alerta={alerta} />}</div>
      </div>

      <div className="bg-white shadow mt-10 rounded-10">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            // Se da por implicito returm y se define el key porque estamos iterando
            <Tarea
              key={tarea._id}
              // creamos el prop de tarea y le pasamos el objeto {tarea}
              tarea={tarea}
            />
          ))
        ) : (
          <p className="text-center my-5 p-10 font-bold">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      <ModalFormularioTarea />
      <ModalEliminarTarea />
    </>
  );
};

export default Proyecto;
