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


export const taskModel = [{ id: 1, title: "", description: "", datetime: "", priority: "" }]
export default function Task() {
    const [tasks, setTask] = useState(taskModel);
    const [busqueda, setBusqueda] = useState("");
    const [tablaTasks, setTablaTasks] = useState(taskModel);
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
            httpGet("tasks").then((data) => {
                setTask(data)
                setTablaTasks(data);
                console.log(data)
            }).catch((error) => console.log(error))
        }, [])
        const results = tasks.map((task) =>
            <ContainerTask key={task.id} task={task} />
        );

        const creartask = () => {
            router.push("/createtask")
        }
        return (
            <div>
                <Image className="background" src={bg} alt="backgroung"></Image>
                <div className="row">

                    <div className="btn-flotante2">
                        <Tasks/>
                    </div>
                    <div className="container-card col-md-6 offset-md-6">
                        <h2 className="h2 mt-3">TASK MASTER</h2>
                        <br />
                        <div className="containerInput">
                            <input className="form-control inputBuscar" type="search" value={busqueda} placeholder="Busqueda por titulo" onChange={handleChange} />
                        </div>
                        <div className="container-secundary">
                            {results}
                        </div>
                        <div className="btn-flotante">
                            <Boton texto='Crear Task' callBack={creartask} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }