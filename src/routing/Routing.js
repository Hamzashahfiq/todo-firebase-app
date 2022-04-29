import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignedToMe from '../pages/assignedToMe/AssignedToMe';
import Home from '../pages/home/Home';
import Important from '../pages/important/Important'
import Planned from '../pages/planned/Planned';
import Task from '../pages/task/Task';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/auth/login/Login';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/important" element={<Important />} />
                <Route path="/planned" element={<Planned />} />
                <Route path="/assigned_to_me" element={<AssignedToMe />} />
                <Route path="/task" element={<Task />} />
                {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
        </BrowserRouter>
        
    )
}
