import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignedToMe from '../pages/assignedToMe/AssignedToMe';
import Home from '../pages/home/Home';
import Important from '../pages/important/Important'
import Planned from '../pages/planned/Planned';
import Task from '../pages/task/Task';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/important" element={<Important />} />
                <Route path="/planned" element={<Planned />} />
                <Route path="/assigned_to_me" element={<AssignedToMe />} />
                <Route path="/task" element={<Task />} />
            </Routes>
        </BrowserRouter>
        
    )
}
