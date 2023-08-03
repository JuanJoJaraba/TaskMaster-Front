"use client"
import Login from '@/pages/login'
import Recovery from '@/pages/recover'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Task from '@/pages/tasks'
import RegisterComponent from '@/pages/register'
import EditTaskComponent from '@/pages/edittask/index'
import CreateTask from '@/pages/createtask/index'
import EditUserComponent from '@/pages/edituser'


const PrivateRoute = ({ element: Element, ...rest }: any) => {
  const isAuthenticated = sessionStorage.getItem('user') !== null;
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/recover" element={<Recovery />} />
        <Route path="/register" element={<RegisterComponent />} />
        <PrivateRoute path="/createtask" element={<CreateTask />} />
        <PrivateRoute path="/tasks" element={<Task />} />
        <PrivateRoute path="/tasks/:id" element={<EditTaskComponent />} />
        <PrivateRoute path="/user/:id" element={<EditUserComponent />} />
      </Routes>
    </BrowserRouter>

  )
}
