import router from 'next/router';
import { useEffect, useState } from 'react';
import Boton from './boton/boton';
import "@/app/components/forms/boton/boton.css"
import Link from 'next/link';
import React from 'react';


const Tasks = () => {
    const [user, setUser] = useState<string | null>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        const userName = sessionStorage.getItem('user');
        // const userId = sessionStorage.getItem('userId');
        setUser(userName);
        // setUserId(userId);
    }, []);
    const handleLogout = () => {
        sessionStorage.clear();
        router.push('/');
    };
    return (
        <div>
            <Link href={""}>
                <p className="boton-perfil">{user}</p>
            </Link>
            <Boton texto="LogOut" callBack={handleLogout} />
        </div>
    );
};

export default Tasks;
