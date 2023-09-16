import router from 'next/router';
import { useEffect, useState } from 'react';
import Boton from './boton/boton';
import "@/app/components/forms/boton/boton.css"
import Link from 'next/link';
import React from 'react';


const Tasks = () => {
    const [user, setUser] = useState<string | null>(null);
    const [Id, setUserId] = useState<number | null>(null);
    
   
    useEffect(() => {
        const usuarioId = sessionStorage.getItem('userId');
        const parsedUserId = usuarioId ? parseInt(usuarioId, 10) : null; // Convierte a número o deja como null
        setUserId(parsedUserId);
    }, []);

    useEffect(() => {
        const userName = sessionStorage.getItem('user');
        setUser(userName);
       
    }, []);
   
    const handleLogout = () => {
        sessionStorage.clear();
        router.push('/');
    };
    
    return (
        <div>
            <Link href={'/user/'+Id}>
                <p className="boton-perfil">{user} </p>
            </Link>
            <Boton texto="LogOut" callBack={handleLogout} />
            
        </div>
    );
};

export default Tasks;
