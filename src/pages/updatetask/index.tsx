import "@/app/css/login.css"
import Image from "next/image"
import { useEffect, useState } from "react";
import "@/app/css/container-primary.css"
import 'bootstrap/dist/css/bootstrap.css';
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg"
import Boton from "@/app/components/forms/boton/boton";
import { httpPut } from "@/app/core/repository/http-request-contract";
import { taskModel } from "@/pages/tasks/index"
import { handleInput } from "@/app/core/repository/handle_input";
import InputText from "@/app/components/forms/input-text/input-text";

export const taskModelSingle = { id: 1, title: "", description: "", datetime: "", priority: "" }
export default function CreateTaskComponent(props: { task?: typeof taskModelSingle }) {
    const [values, setValues] = useState(taskModel)
    useEffect(() => {
        if (props.task?.title != '' && props.task != null) {
            setValues([props.task])
        }
    }, [])
    const updateTask = () => {
        httpPut("tasks", values, props.task?.id + '').then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
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
    return (
        <div>
            <Image className="background" src={bg} alt="backgroung"></Image>
            <div className="row ">
                <div className="container-primary col-md-4 offset-md-8">
                    <h2 className="h2 mt-4">TASK MASTER</h2>
                    <h2 className="h2 mt-4">Crear Task</h2>
                    <InputText hint="Titulo" id="titulo" value={props.task?.title} type="text" handleInput={[handleInput, values, setValues]} />
                    <InputText hint="Fecha" id="fecha" value={setDate(props.task?.datetime)} type="date" handleInput={[handleInput, values, setValues]} />
                    <InputText hint="Prioridad" id="prioridad" value={props.task?.priority} type="text" handleInput={[handleInput, values, setValues]} />
                    <InputText hint="Descripcion" id="Descripcion" value={props.task?.description} type="textarea" handleInput={[handleInput, values, setValues]} />
                    <br />

                   { props.task?.id != null ? (<Boton texto="Update Task" callBack={() => { updateTask() }} />) : 
                    (<Boton texto="Create Task" callBack={() => { updateTask() }} />)}




                </div>
            </div>
        </div>
    )
}