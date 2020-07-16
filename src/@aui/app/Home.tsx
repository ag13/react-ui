import React from 'react'
import { NavLink } from 'react-router-dom'

export const Home = () => {
    return (
        <>
            <div>Sample application to demonstrate usage of common component library</div>
            <ul>
                <li><NavLink to="/process">Process Group</NavLink></li>
                <li><NavLink to="/node">Node Group</NavLink></li>
            </ul>
        </>
    )
}