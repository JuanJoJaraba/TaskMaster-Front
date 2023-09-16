import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "@/app/css/container-primary.css"
import Link from 'next/link';
import { httpDelete } from '@/app/core/repository/http-request-contract';
import Swal from 'sweetalert2';
import router from 'next/router';
import { taskModel } from '@/pages/home';


export default function ContainerTask(props: { task: any }) {
    const [values, setValues] = useState(taskModel)
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.js");
    }, []);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteTask = () => {
        httpDelete("tasks", values, props.task?.id + '').then((response) => {
            console.log(response);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Ha eliminado la tarea exitosamente',
                showConfirmButton: false,
                timer: 2000
            });
            // Recargar la página actual después de eliminar la tarea
            router.reload();
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <div className="list-group" key={props.task.id}>
            <div>
                <h5 className="mb-1 mt-4 ml-4">{props.task.title}</h5>
            </div>
            <br />
            <>
                <Button variant="primary" onClick={handleShow}>
                    Detail Task
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.task.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Id: {props.task.id}
                        <br /> Date: {props.task.datetime}
                        <br />Description: {props.task.description}
                        <br /> Prioridad: {props.task.priority}
                        <br /> Status: {props.task.status}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={deleteTask}>
                            Delete
                        </Button>
                        <Link className="btn btn-primary" href={"/task/" + props.task.id}> Edit </Link>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
}