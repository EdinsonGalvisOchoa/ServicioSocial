import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";

const Proyectos = () => {
  const { proyectos } = useProyectos();
  console.log(proyectos);
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg p-5">

        {proyectos.length ? 

        // Iterar sobre cada uno de los proyectos para asi retorar un nuevo componente llamado preview y que se pueda listar los proyectos
        proyectos.map(proyecto =>(
          <PreviewProyecto

          key={proyecto._id}
          proyecto={proyecto}
          
          />
        ))       
        :
        <p className=" text-center text-gray-600 uppercase">No hay proyectos</p>
        
      }

      </div>




    </>
  );
};

export default Proyectos;
