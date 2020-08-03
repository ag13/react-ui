import React from 'react'
import { NavLink } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <div>Demo of widget framework and common component library</div>
            <ul>
                <li><NavLink to="/dashboard">Widget Framework and inter communication</NavLink></li>
                <li><NavLink to="/process">UI Component - Process Group</NavLink></li>
                <li><NavLink to="/node">UI Component - Node Group</NavLink></li>
                <li><NavLink to="/dashboardMaker">Dashboard Maker</NavLink></li>
                <li><NavLink to="/dashboards">Dashboard Viewer</NavLink></li>
            </ul>
        </>
    )
}