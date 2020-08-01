import React, { useEffect, useState } from 'react' 
import GridLayout from 'react-grid-layout'

interface DashboardGridLayoutProps {
    plugins: any
}

export const _DashboardGridLayout: React.FC<DashboardGridLayoutProps> = ({plugins}) => {
    const [layout, setLayout] = useState<any>([])

    useEffect(() => {
        const layouts = plugins.map((plugin: any, index: any) => {
            return {
                i: plugin.key, 
                x: (index * 6) % 12,
                y: index * 12,
                w: 6,
                h: 12
            }
        })
        setLayout(layouts)
    }, [plugins])

    return (
        <GridLayout className="layout" layout={layout} width={1200} cols={12}>
            {
                plugins.map((plugin: any, index: any) => (                            
                    <div key={plugin.key}>{plugin}</div>
                ))
            }
        </GridLayout>
    )
}

export const DashboardGridLayout = _DashboardGridLayout