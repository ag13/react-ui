import React, { useEffect, useState, useCallback } from 'react' 
import GridLayout from 'react-grid-layout'
import { useLocalStorage } from '@aui/common/useLocalStorage';

interface DashboardGridLayoutProps {
    plugins: any
}

export const _DashboardGridLayout: React.FC<DashboardGridLayoutProps> = ({plugins}) => {
    const [layout, setLayout] = useState<any>([])
    const [value, setValue] = useLocalStorage<any>('dashboardLayout', [])

    const handleOnLayoutChange: (currentLayout: any[]) => any = useCallback((currentLayout: any) => {
        const layoutValues = [...value]
        if(currentLayout && currentLayout.length){
            currentLayout.forEach((newLayout: any) => {
                const layoutFound = layoutValues.find(layoutVal => layoutVal.id === newLayout.i)
                if(layoutFound){
                    layoutFound.layout = newLayout
                }
            })
        }
        setValue(layoutValues)
    }, [value, setValue])

    useEffect(() => {
        const pluginLayouts: any[] = []
        const layouts = plugins.map((plugin: any, index: any) => {
            const layout = {
                i: plugin.key, 
                x: (index * 6) % 12,
                y: index * 12,
                w: 6,
                h: 12
            }
            const pluginIndex = pluginLayouts.findIndex((pluginLayout) => {
                return pluginLayout.id === plugin.key
            })
            if(pluginIndex === -1){
                pluginLayouts.push({
                    id: plugin.key,
                    layout,
                    plugin
                })
            }
            return layout
        })
        setLayout(layouts)
        setValue(pluginLayouts)
    }, [plugins, setValue])

    return (
        <>
        <GridLayout className="layout" layout={layout} width={1200} cols={12} onLayoutChange={(currentLayout) => handleOnLayoutChange(currentLayout)}>
            {
                plugins.map((plugin: any, index: any) => (                            
                    <div key={plugin.key}>{plugin}</div>
                ))
            }
        </GridLayout>
        </>
    )
}

export const DashboardGridLayout = _DashboardGridLayout