"use client"
import Login from '@/pages/login';
import Recovery from '@/pages/recover';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegisterComponent from '@/pages/register';
import EditTaskComponent from '@/pages/task/[id]';
import EditUserComponent from '@/pages/user/[id]';
import Home from '@/pages/home';
import CreateTaskComponent from '@/pages/task';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/recover" element={<Recovery />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/home" element={<Home />} />
        <Route path="/task" element={<CreateTaskComponent />} />
        <Route path="/task/:id" element={<EditTaskComponent />} />
        <Route path="/user/:id" element={<EditUserComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

