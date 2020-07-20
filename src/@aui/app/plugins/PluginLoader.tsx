import React, { lazy, useState, useEffect, Suspense } from 'react'
import plugins from './plugin.json'

export const PluginLoader = () => {
    const [components, setComponents] = useState<any>([])

    const importComponent = (plugin: any) => 
        lazy(() => 
            import(`./${plugin.name}/index.ts`)
        )

    useEffect(() => {
        async function loadPlugins() {
            const componentPromises = plugins.map(async plugin => {
                const Component: any = await importComponent(plugin)
                return <Component key={plugin.name} />
            })

            Promise.all(componentPromises).then(setComponents)
        }

        loadPlugins()
    }, [])

    return (
        <>
        <div>Plugins that can be added via configuration</div>
        <Suspense fallback='Loading views...'>
            <div>{components}</div>
        </Suspense>
        </>
    )
}