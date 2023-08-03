import "@/app/css/login.css"
import Image from "next/image"
import { useState } from "react";
import "@/app/css/container-primary.css"
import 'bootstrap/dist/css/bootstrap.css';
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg"
import InputRegister from "@/app/components/forms/input-text/input-text(register)";
import Boton from "@/app/components/forms/boton/boton";
import React from "react";
import Swal from "sweetalert2";
import { registerBody, validateRegisterBody } from "@/app/core/repository/register/register";
import { httpPost } from "@/app/core/repository/http-request-contract";
import { handleInput } from "@/app/core/repository/handle_input";
import router from "next/router";


export default function RegisterComponent() {
    const [values, setValues] = useState(registerBody)

    const validateLogin = async () => {
        console.log(values)
        let validation = validateRegisterBody(values)
        if (typeof validation === 'string') alert(validation)
        else httpPost("users", values).then((response) => { console.log(response) }).catch((err) => { console.log(err) }).then((response) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Te haz registrado exitosamente',
                showConfirmButton: false,
                timer: 2000
            })
        })  
        router.push("/")
    }
    return (
        <div>
            <Image className="background" src={bg} alt="backgroung"></Image>
            <div className="row ">
                <div className="container-primary col-md-4 offset-md-8">
                    <h1 className="h1 mt-4">TASK MASTER</h1>
                    <h1 className="h1 mt-4">Registro</h1>
                    <InputRegister hint="Nombres" id="name" type="text" handleInput={[handleInput, values, setValues]} />
                    <InputRegister hint="Apellidos" id="lastName" type="text" handleInput={[handleInput, values, setValues]} />
                    <InputRegister hint="Password" id="password" type="password" handleInput={[handleInput, values, setValues]} />
                    <InputRegister hint="Email" id="email" type="email" handleInput={[handleInput, values, setValues]} />
                    <br />
                    <Boton texto='Registrar' callBack={() => { validateLogin() }} />
                    <br />
                    <a href="/">Ya tengo una cuenta</a>
                </div>
            </div>
        </div>
    )
}
