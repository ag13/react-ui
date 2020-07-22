import React, { lazy, useState, useEffect, Suspense, useCallback } from 'react'
import plugins from './plugin.json'
import { useDispatch, useSelector } from 'react-redux'
import { Snackbar, IconButton, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export const PluginLoader = () => {
    const [components, setComponents] = useState<any>([])
    const [eventMessage, setEventMessage] = useState({})
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const eventId = useSelector((state: any) => state.eventId)
    const savedData = useSelector((state: any) => state.savedData)

    useEffect(() => {
        setEventMessage({
            eventName: 'save',
            eventId
        })
    }, [eventId])

    useEffect(() => {
        if(savedData){
            setOpen(true)
            console.log(savedData)
        }
    }, [savedData])

    const importComponent = (plugin: any) => 
        lazy(() => 
            import(`./${plugin.name}/index.ts`)
        )

    const handleEventComplete: (param: any) => void = useCallback((param) => {
        const {eventName, eventId, data} = param
        dispatch({type: 'SAVE_COMPLETE', payload: {eventName, eventId, data}})
    }, [dispatch])

    useEffect(() => {
        async function loadPlugins() {
            const componentPromises = plugins.map(async plugin => {
                const Component: any = await importComponent(plugin)
                return <Component 
                    key={plugin.name} 
                    event={eventMessage}
                    onEventComplete={handleEventComplete}
                />
            })

            Promise.all(componentPromises).then(setComponents)
        }

        loadPlugins()
    }, [eventMessage, handleEventComplete])

    const handleClose: (event: any) => void = (event) => {
        setOpen(false);
      };

    return (
        <>
        <div>Plugins that can be added via configuration</div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Saved successfully"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        <Suspense fallback='Loading views...'>
            <div>{components}</div>
        </Suspense>
        </>
    )
}