import "@/app/css/login.css"
import Image from "next/image"
import { useState } from "react";
import router from "next/router";
import "@/app/css/container-primary.css"
import 'bootstrap/dist/css/bootstrap.css';
import Boton from "@/app/components/forms/boton/boton";
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg"
import { handleInput } from "@/app/core/repository/handle_input";
import InputRegister from "@/app/components/forms/input-text/input-text(register)";
import { registerBody, validateRegisterBody } from "@/app/core/repository/register/register";

export default function Recovery() {
    const [values, setValues] = useState(registerBody)

    const cancelar = () => {
        router.push("/")
    }
    return (
        <div>
            <Image className="background" src={bg} alt="backgroung"></Image>
            <div className="row ">
                <div className="container-primary col-md-3 offset-md-9">
                    <br />
                    <br />
                    <h2 className="h2 mt-5">TASK MASTER</h2>
                    <h2 className="h2">Recuperar Contraseña</h2>
                    <InputRegister hint="Email" id="correo" type="text" handleInput={[handleInput, values, setValues]} />
                    <br />
                    <br />
                    <Boton texto='Recuperar contraseña' callBack={() => {alert(validateRegisterBody(values))}} />
                    <Boton texto='Cancelar' callBack={cancelar} />
                </div>
            </div>
        </div>
    )
}







