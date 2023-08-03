import React from "react";
import Link from "next/link";
import "@/app/css/login.css";
import Image from "next/image";
import { useState } from "react";
import { UserModel } from "../edituser";
import "@/app/css/container-primary.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from "next/navigation";
import Boton from "@/app/components/forms/boton/boton";
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg";
import { handleInput } from "@/app/core/repository/handle_input";
import { httpPost } from "@/app/core/repository/http-request-contract";
import InputText from "@/app/components/forms/input-text/input-text";
import { loginBody, validateLoginBody } from "@/app/core/repository/login/login";

export default function Login() {
  const router = useRouter();
  const [values, setValues] = useState(loginBody)
  const [user, setUser] = useState(UserModel)
  React.useEffect(() => {
    validateSesion()
  }, [])

  const validateSesion = () => {
   const userData = (window.sessionStorage.getItem("user"));
   if (userData) {
    setUser(JSON.parse(userData));
  }
  }
  const validateLogin = async () => {
    let validation = validateLoginBody(values)
    if (typeof validation === 'string') alert(validation)
    else httpPost("users/login", values).then((response) => { sessionStorage.setItem("user", response.name); sessionStorage.setItem('userId', response.userId); router.push("/tasks") }).catch((err) => { console.log(err) });
    validateSesion()
  }
  return (
    <div>
      <Image className="background" src={bg} alt="backgroung"></Image>
      <div className="row ">
        <div className="container-primary col-md-3 offset-md-9">
          <br />
          <br />
          <h1 className="h1 mt-4">TASK MASTER</h1>
          <h1 className="h1 mt-4">Login</h1>
          <br />
          <InputText hint="Email" id="email" type="email" handleInput={[handleInput, values, setValues]} />
          <br />
          <InputText hint="Password" id="password" type="password" handleInput={[handleInput, values, setValues]} />
          <br />
          <Boton texto="Login" callBack={() => { validateLogin() }} />
          <br />
          <Link href="/recover">Recuperar contraseña</Link>
          <br />
          <Link href="/register">CREAR CUENTA</Link>
        </div>
      </div>
    </div>
  )
}