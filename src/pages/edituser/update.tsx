import "@/app/css/login.css"
import { UserModel } from ".";
import Image from "next/image"
import "@/app/css/container-primary.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import Boton from "@/app/components/forms/boton/boton";
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg"
import { handleInput } from "@/app/core/repository/handle_input";
import InputText from "@/app/components/forms/input-text/input-text";
import { httpPut } from "@/app/core/repository/http-request-contract";

export const UserModelSingle = { id: 1, name: "", lastName: "", email: "", password: "" }
export default function UpdateUser(props: { user?: typeof UserModelSingle }) {
    const [values, setValues] = useState(UserModel)
    useEffect(() => {
        if (props.user?.email != '' && props.user != null) {
            setValues([props.user])
        }
    }, [])
    const updateUser = () => {
        httpPut("users", values, props.user?.id + '').then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            <Image className="background" src={bg} alt="backgroung"></Image>
            <div className="row ">
                <div className="container-primary col-md-4 offset-md-8">
                    <h2 className="h2 mt-4">TASK MASTER</h2>
                    <h2 className="h2 mt-4">Edit User</h2>
                    <InputText hint="Nombre" id="name" value={props.user?.name} type="text" handleInput={[handleInput, values, setValues]} />
                    <InputText hint="Apellidos" id="lastName" value={props.user?.lastName} type="date" handleInput={[handleInput, values, setValues]} />
                    <InputText hint="Email" id="email" value={props.user?.email} type="text" handleInput={[handleInput, values, setValues]} />
                    <InputText hint="Password" id="password" value={props.user?.password} type="text" handleInput={[handleInput, values, setValues]} />
                    <br />
                    {props.user?.id != null ? (<Boton texto="Update User" callBack={() => { updateUser() }} />) :
                        (<Boton texto="Update User" callBack={() => { updateUser() }} />)}
                </div>
            </div>
        </div>
    )
}