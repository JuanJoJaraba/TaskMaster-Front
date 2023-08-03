import { httpGet } from "@/app/core/repository/http-request-contract";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateTaskComponent from "@/pages/updatetask";


export default function EditTaskComponent() {

    const [task, setTask] = useState({ id: 0, title: "", description: "", datetime: "", priority: "" })
    const [render, renderTask] = useState(<CreateTaskComponent />)
    const router = useRouter()
    useEffect(() => {
        if (router.asPath !== router.route) {
            httpGet("tasks/" + router.query.id).then((response) => {
                setTask(response)
                console.log(response);
                renderTask(<CreateTaskComponent task={task} />)

            }).catch((error) => console.log(error))
        }
    }, [router.isReady])
    return (
        <div>{task.id != 0 ? (<CreateTaskComponent task={task} />) : (<div></div>)}</div>
    )
}