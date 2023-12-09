export const formatearFecha = fecha =>{


    const nuevaFecha = new Date(fecha.split("T")[0].split("-"))


    const opciones = {
        // long es para que aparezca el nombre
        // numeric para que aparezca el numero
        weekday:"long",
        year:"numeric",
        month: "long",
        day:"numeric"
        }
// es-ES . la queremos en español y le pasamos las opciones
        return nuevaFecha.toLocaleDateString("es-ES",opciones)
}