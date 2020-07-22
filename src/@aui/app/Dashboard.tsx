import React from 'react'
import { PluginLoader } from "./plugins/PluginLoader"
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

export const Dashboard = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        //dispatch an action with event type and a unique id
        dispatch({type: 'SAVE', payload: {eventId: Math.random()}})
    }

    return (
        <>
            <Button onClick={handleClick}>Save</Button>
            <PluginLoader />
        </>
    )
}