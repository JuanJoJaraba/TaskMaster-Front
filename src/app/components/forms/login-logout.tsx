import router from 'next/router';
import { useEffect, useState } from 'react';
import Boton from './boton/boton';
import "@/app/components/forms/boton/boton.css"
import Link from 'next/link';
import ContainerUser from '../container-user/container.user';

const Tasks = () => {
    const [user, setUser] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const userName = sessionStorage.getItem('user');
        const userId = sessionStorage.getItem('id');
        setUser(userName);
        setUserId(userId);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        router.push('/');
    };

    return (
        <div>

            <Link className="boton-perfil" href={"/user/" + userId}> {user}</Link>
            <Boton texto="LogOut" callBack={handleLogout} />
        </div>
    );
};

export default Tasks;
