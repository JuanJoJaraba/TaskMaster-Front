import "@/app/css/login.css"
import Image from "next/image"
import Swal from "sweetalert2";
import router from "next/router";
import "@/app/css/container-primary.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import { taskModel, taskModelSingle } from "@/pages/home/index";
import Boton from "@/app/components/forms/boton/boton";
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg"
import { handleInput } from "@/app/core/repository/handle_input";
import { httpPost, httpPut } from "@/app/core/repository/http-request-contract";
import InputRegister from "@/app/components/forms/input-text/input-text(register)";


export default function CreateTask(props: { task?: typeof taskModelSingle }) {
    const [values, setValues] = useState(taskModel)
    useEffect(() => {
        if (props.task?.title != '' && props.task != null) {
            setValues([props.task])
        }
    }, [])

    const createTask = () => {
        httpPost("tasks", values).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        }).then((response) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registrado exitosamente la tarea',
                showConfirmButton: false,
                timer: 2000
            })
            router.push("/home")
        })
    }

    const updateTask = () => {
        httpPut("tasks", values, props.task?.id + '').then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
        }).then((response) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Actualizado exitosamente la tarea',
                showConfirmButton: false,
                timer: 2000
            })
            router.push("/home")
        })
    }
    function setDate(date?: string): string {
        var dateArray = date?.split("T")
        try {
            return dateArray!![0];
        } catch (e: any) {
            return ''
        }
    } 
    const cancelar = () =>{
        router.push("/home")
    }
    return (
        <div>
            <Image className="background" src={bg} alt="backgroung"></Image>
            <div className="row ">
                <div className="container-primary col-md-4 offset-md-8">
                    <h2 className="h2 mt-4">TASK MASTER</h2>
                    <h2 className="h2 mt-4">Crear Task</h2>
                    <InputRegister hint="Titulo" id="title" value={props.task?.title} type="text" handleInput={[handleInput, values, setValues]} />
                    <InputRegister hint="Fecha" id="datetime" value={setDate(props.task?.datetime)} type="date" handleInput={[handleInput, values, setValues]} />
                    <InputRegister hint="Prioridad" id="priority" value={props.task?.priority} type="text" handleInput={[handleInput, values, setValues]} />
                    <InputRegister hint="Descripcion" id="description" value={props.task?.description} type="textarea" handleInput={[handleInput, values, setValues]} />
                    <br />
                    {
                        props.task?.id != null ? (<Boton texto="Update Task" callBack={() => { updateTask() }} />
                        ) : (<Boton texto="Create Task" callBack={() => { createTask() }} />)
                    }
                    <Boton texto="Cancelar" callBack={cancelar} />
                </div>
            </div>
        </div>
    )
}