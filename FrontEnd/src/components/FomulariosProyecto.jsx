import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alertas from "./Alertas";

const FomularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams();
  const { mostrarAlerta, alerta, submitProyecto,proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {

      // seteamos los hooks del fomulario con los valores extraidos del state
      setId(proyecto._id);
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      // El problema es que no esta definido la fecha de entrega en el momento se hace el slip razon por la cual genera errro
      // viene mas rapido la consulta a la url id que la consulta a la api para la fecha de entrega
      // esto se solucion con encadenamiento opcional "optional chaining", al colocarle la incognita , el valida que si exista un valor y aplica el split
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
      setCliente(proyecto.cliente)
      
    } else {
      console.log("NuevoProyecto");
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // valñidacion de campos obligatios

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Pasar los datos hacia el provider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alertas alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripcion
        </label>
        <textarea
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripcion proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Nombre cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre proyecto"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id? "Actualizar proyecto" : "Crear proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FomularioProyecto;
