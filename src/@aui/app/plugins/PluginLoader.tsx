import React, { lazy, useState, useEffect, Suspense } from 'react'
import plugins from './plugin.json'
import { useSelector } from 'react-redux'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withWidget, PluginProps } from './WidgetComponent'

export const PluginLoader = () => {
    const [components, setComponents] = useState<any>([])
    const [open, setOpen] = useState(false)
    const savedData = useSelector((state: any) => state.savedData)

    useEffect(() => {
        if(savedData){
            setOpen(true)
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
                return <UIWidget key={plugin.id} />
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
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="On Container: Operation successful"
            action={
            <React.Fragment>
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