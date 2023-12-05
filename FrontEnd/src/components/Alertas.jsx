

const Alertas = ({alerta}) => {
  return (
    // Validacion de la alerta, si esta como true(?) agrege un degragado de izquierda a derecha que comience en 400 y termine en 600 , sino (:)
    //to-br indica la direccion de gradiant 
    <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-sky-400 to-sky-600'}bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`} >
    {alerta.msg}
        
    </div>
  )
}

export default Alertas