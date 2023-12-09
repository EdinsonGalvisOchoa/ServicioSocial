import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"


const Header = () => {

  const {cerrarSesionProyectos} = useProyectos()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = ()=>{
    cerrarSesionProyectos()
    cerrarSesionAuth()
    localStorage.removeItem("token")
  }



  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center">
          Servicio Social
        </h2>

        <input
          type="search"
          placeholder="Buscar proyecto"
          className="rounded-lg lg:w-96 block p-2 border"
        />

        <div className="flex items-center gap-4">

        <Link
         to="/proyectos" 
         className="font-bold uppercase"
        >proyectos</Link>

        <button
        type="button"
        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
        onClick={handleCerrarSesion}       
        > Cerrar sesíon </button>


        </div>

      </div>
    </header>
  )
}

export default Header;
