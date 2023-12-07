// hooks para poder acceder a los datos del provider
import{useContext} from "react"
import AuthContext  from "../context/AuthProvider"




const useAuth = () => {
  return (
    //
    useContext(AuthContext)
  )
}

export default useAuth