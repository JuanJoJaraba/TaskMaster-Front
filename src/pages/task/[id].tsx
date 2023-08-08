import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { httpGet } from "@/app/core/repository/http-request-contract";
import CreateTask from ".";


export default function EditTaskComponent() {
    const [task, setTask] = useState({ id: 0, title: "", description: "", datetime: "", priority: "" })
    const [render, renderTask] = useState(<CreateTask />)
    const router = useRouter()
    useEffect(() => {
        if (router.asPath !== router.route) {
            httpGet("tasks/" + router.query.id).then((response) => {
                setTask(response)
                console.log(response);
                renderTask(<CreateTask task={task} />)
            }).catch((error) => console.log(error))
        }
    }, [router.isReady])
    return (
        <div>{task.id != 0 ? (<CreateTask task={task} />) : (<div></div>)}</div>
    )
}