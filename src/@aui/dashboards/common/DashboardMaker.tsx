import React, { useState, useCallback, Suspense } from 'react'
import { AppBar, Toolbar, Button, makeStyles, Dialog, DialogTitle, DialogActions, DialogContent, Grid, Card, CardContent } from '@material-ui/core'
import { AUITypography } from '@aui/util'
import { Trans }  from '@lingui/macro'
import GridLayout from 'react-grid-layout'
import plugins from '@aui/app/plugins/plugin.json'
import { lightOrange } from '@aui/util'
import isEmpty from 'lodash/isEmpty'
import { loadPlugin } from '@aui/app/plugins'


const useStyles = makeStyles({
    title: {
        flexGrow: 1
    },
    pluginsContainer: {
        marginTop: '30px'
    },
    selectedPlugin: {
        backgroundColor: lightOrange
    }
})

export const DashboardMaker = () => {
    const classes = useStyles({})
    const [isAddTileOpen, setIsAddTileOpen] = useState(false)
    const [selectedPlugin, setSelectedPlugin] = useState<any>({})
    const [loadedPlugins, setLoadedPlugins] = useState<any>([])

    const layout = [
        {i: 'nodeGroups', x: 0, y: 0, w: 6, h: 5, static: true},
        {i: 'processGroups', x: 6, y: 0, w: 6, h: 5, static: true}
    ]

    const handleAddTile = () => {
        setIsAddTileOpen(true)   
    }

    const handleClose = () => {
        setIsAddTileOpen(false)
    }

    const handlePluginSelection = (plugin: any) => {
        setSelectedPlugin(plugin)
    }

    // const addLayout = useCallback((plugins) => {
    //     const layout = plugins.map((item: any, i: any) => {
    //         return {
    //             i: item.id, x: 0, y: 0, w: 1, h: 2, static: true
    //         }
    //       })
    //     //   setLayout(layout)
    // }, [])

    const handleTileSelection = useCallback(() => {
        setIsAddTileOpen(false)
        if(selectedPlugin){
            Promise.all([loadPlugin(selectedPlugin)])
                .then((resolvedPlugins) => {
                    setLoadedPlugins([...loadedPlugins, ...resolvedPlugins])
                })
            // addLayout(plugins)
        }else{
            console.log('No plugin selected!')
        }
    }, [loadedPlugins, selectedPlugin])

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <AUITypography kind="sectionSubtitle" className={classes.title}>
                        Dashboard Maker
                    </AUITypography>
                    <Button>
                        <Trans>Publish as Dashboard</Trans>
                    </Button>
                    <Button variant="contained" onClick={handleAddTile}>
                        <Trans>Add tile</Trans>
                    </Button>
                </Toolbar>
            </AppBar>
            
            {loadedPlugins && loadedPlugins.length ?
                (
                    <Suspense fallback="Loading grid">
                        <GridLayout className="layout" layout={layout} cols={12} rowHeight={300} width={1200}>
                        {
                            
                            loadedPlugins.map((plugin: any) => (                            
                                <div key={plugin.key}>{plugin}</div>
                            ))
                        }
                        </GridLayout>
                    </Suspense>
                ) : null
            }

            <Dialog
                open={isAddTileOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <DialogTitle>
                        <AUITypography kind="sectionSubtitle">Choose a tile to add to the Dashboard</AUITypography>
                    </DialogTitle>
                    <DialogContent>
                        <AUITypography kind="sectionTextGray">
                            You can choose from the list of widgets that get shown on the dashboard. You can change the position of the widgets in the dashboard after selection
                        </AUITypography>
                        <Grid container spacing={3} className={classes.pluginsContainer}>
                            {
                                plugins.map((plugin: any) => {
                                    return (
                                        <Grid item xs={3} key={plugin.id}>
                                            <Card onClick={() => handlePluginSelection(plugin)} className={plugin.id === selectedPlugin.id ? classes.selectedPlugin : ''}>
                                                <CardContent>
                                                    <AUITypography kind="sectionSubtitle">{plugin.displayName}</AUITypography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                            
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            <Trans>Cancel</Trans>
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleTileSelection} disabled={isEmpty(selectedPlugin)}>
                            <Trans>Add</Trans>
                        </Button>
                    </DialogActions>
            </Dialog>
        </>
    )
}