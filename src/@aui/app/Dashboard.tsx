import React, { useState, useCallback } from 'react'
import { PluginLoader, EventTypes } from "./plugins"
import { Button, Grid, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    dashboardContainer: {
        margin: theme.spacing(3)
    },
    btnContainer: {
        marginBottom: '30px'
    }
}))

export const Dashboard = () => {
    const [groupName, setGroupName] = useState('')
    const classes = useStyles({})
    const dispatch = useDispatch()

    const handleGroupNameChange = useCallback((event: any) => {
        setGroupName(event.target.value)
    }, [])

    const handleSaveClick = () => {
        //dispatch an action with event type and a unique id
        setGroupName('')
        dispatch({type: 'SAVE', payload: {eventName: EventTypes.SAVE, eventId: Math.random(), data: {groupName}}})
    }

    const handleNextClick = () => {
        dispatch({type: 'NEXT_PAGE', payload: {eventName: EventTypes.NEXT_PAGE, eventId: Math.random()}})
    }
    
    const handlePreviousClick = () => {
        dispatch({type: 'PREVIOUS_PAGE', payload: {eventName: EventTypes.PREVIOUS_PAGE, eventId: Math.random()}})
    }

    return (
        <>
            <div className={classes.dashboardContainer}>
                <div className={classes.btnContainer}>
                    <Grid container>
                        <Grid item xs={2}>
                            <TextField id="standard-basic" label="Group Name" value={groupName} onChange={handleGroupNameChange} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="secondary" onClick={handleSaveClick}>Save</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="secondary" onClick={handlePreviousClick}>Previous</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="secondary" onClick={handleNextClick}>Next</Button>
                        </Grid>
                    </Grid>
                </div>
                <PluginLoader />
            </div>
        </>
    )
}