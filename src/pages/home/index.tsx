import React, { useContext } from "react";
import "@/app/css/login.css"
import Image from "next/image"
import router from "next/router";
import { useState } from "react";
import "@/app/css/container-primary.css"
import 'bootstrap/dist/css/bootstrap.css';
import Boton from "@/app/components/forms/boton/boton";
import bg from "@/app/assets/image/gestion_de_tareas_2.jpg"
import { httpGet } from "@/app/core/repository/http-request-contract";
import ContainerTask from "@/app/components/container-task/container.task";
import Tasks from "@/app/components/forms/login-logout";

export const taskModelSingle = { id: 1, title: "", description: "", datetime: "", priority: "", status: "" }
export const taskModel = [taskModelSingle]
export default function Home() {
    const [tasks, setTask] = useState(taskModel);
    const [busqueda, setBusqueda] = useState("");
    const [tablaTasks, setTablaTasks] = useState(taskModel);
    const pendienteTasks = tasks.filter(task => task.status === "pendiente");
    const progresoTasks = tasks.filter(task => task.status === "progreso");
    const completadoTasks = tasks.filter(task => task.status === "completado");
    const filtrar = (terminoBusqueda: string) => {
        var resultadosBusqueda = tablaTasks.filter((elemento) => {
            if (elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setTask(resultadosBusqueda);
    }
    const handleChange = (e: any) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value)
    }
    React.useEffect(() => {
        if (sessionStorage.getItem("user") == undefined) {
            router.push("/login")
        }
        httpGet("tasks").then((data) => {
            if (Array.isArray(data)) {
                setTask(data);
                setTablaTasks(data);
            }
            console.log(data)
        }).catch((error) => console.log(error))
    }, [])
    const results = tasks.map((task) =>
        <ContainerTask key={task.id} task={task} />
    );

    const creartask = () => {
        router.push("/task")
    }
    return (
        <div>
            <Image className="background" src={bg} alt="backgroung"></Image>
            <div className="row">
                <div className="btn-flotante2">
                    <Tasks />
                </div>
                <div className="container-card col-md-9 offset-md-3">
                    <h2 className="h2 mt-3">TASK MASTER</h2>
                    <br />
                    <div className="containerInput">
                        <input className="form-control inputBuscar" type="search" value={busqueda} placeholder="Busqueda por titulo" onChange={handleChange} />
                    </div>
                    <div className="container-secundary">
                        <div className="container-secundary2">
                            <div className="column">
                                <h3>Pendiente</h3>
                                {pendienteTasks.map(task => <ContainerTask key={task.id} task={task} />)}
                            </div>
                            <div className="column">
                                <h3>Progreso</h3>
                                {progresoTasks.map(task => <ContainerTask key={task.id} task={task} />)}
                            </div>
                            <div className="column">
                                <h3>Completado</h3>
                                {completadoTasks.map(task => <ContainerTask key={task.id} task={task} />)}
                            </div>
                        </div>
                    </div>
                    <div className="btn-flotante">
                        <Boton texto='Crear Task' callBack={creartask} />
                    </div>
                </div>
            </div>
        </div>
    )
}