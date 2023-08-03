import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "@/app/css/container-primary.css"
import Link from 'next/link';


export default function ContainerTask(props: { task: any }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.js");
    }, []);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="list-group" key={props.task.id}>
            <div>
                <h5 className="mb-1 mt-4 ml-4">{props.task.title}</h5>
                <small>{props.task.datetime}</small>
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
                        <br /> Prioridad: {props.task.priority}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Link className="btn btn-primary" href={"/tasks/" + props.task.id}> Edit </Link>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
}

