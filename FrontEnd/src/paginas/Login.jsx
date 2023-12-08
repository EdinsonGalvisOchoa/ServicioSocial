import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alertas from "../components/Alertas";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

// el token se carga al local storage y no al sesion storage para que no se elimine al cerrar la pagina
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState("");

  // llamo a la funcion useAuth que se encuentra enm la carpeta de hooks que asu vez extrae todo lo que se encuentre en autoprovider quien se encuentra en la carpeta context
  const { setAuth } = useAuth();
  const { navigate } = useNavigate;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/login/`, {
        email,
        password,
      });
      // seteamos la alerta para que no se siga mostrando
      setAlerta([]);
      // enviamos la informacion al local storage
      localStorage.setItem("token", data.token);
      // seteamos  el useAuth con la informacion de autenticacion enviada desde el backend al momento de confirmar la contraseña
      setAuth(data);
      //redireccionamos
      navigate("/proyectos");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión{" "}
      </h1>

      {msg && <Alertas alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-state-500 uppercase text-sm"
          to="/registrar"
        >
          No tienes una cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-state-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
