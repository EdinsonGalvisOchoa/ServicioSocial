// Cliente Axios, con el fin de crear una variable axios y asi lo llame complete el codigo siempre
import axios from "axios";

const clienteAxios = axios.create({
    baseURL :`${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;