import React, { lazy, useState, useEffect, Suspense } from 'react'
import plugins from './plugin.json'
import { useSelector } from 'react-redux'
import { Snackbar, IconButton, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withWidget, PluginProps } from './InjectedComponent'

export const PluginLoader = () => {
    const [components, setComponents] = useState<any>([])
    const [open, setOpen] = useState(false)
    const savedData = useSelector((state: any) => state.savedData)

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

    useEffect(() => {
        async function loadPlugins() {
            const componentPromises = plugins.map(async plugin => {
                const PluginComponent = await importComponent(plugin)
                const UIWidget = withWidget(plugin as PluginProps)(PluginComponent)
                return <UIWidget />
            })

            Promise.all(componentPromises).then(setComponents)
        }

        loadPlugins()
    }, [])

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