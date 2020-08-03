import React, { useState, useCallback, Suspense } from 'react'
import { AppBar, Toolbar, Button, makeStyles, Dialog, Snackbar, DialogTitle, DialogActions, DialogContent, Grid, Card, CardContent, TextField } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { AUITypography } from '@aui/util'
import { Trans }  from '@lingui/macro'
import plugins from '@aui/app/plugins/plugin.json'
import { lightOrange } from '@aui/util'
import isEmpty from 'lodash/isEmpty'
import { loadPlugin } from '@aui/app/plugins'
import { DashboardGridLayout } from './DashboardGridLayout'
import { useLocalStorage } from '@aui/common/useLocalStorage'


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
    const [layoutValue] = useLocalStorage('dashboardLayout', [])
    const [savedDashboardValues, setSavedDashboardValues] = useLocalStorage<any>('savedDashboard', [])
    const [dashboardName, setDashboardName] = useState('')
    const [isDashboardPublishOpen, setIsDashboardPublishOpen] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    const handleDashboardPublishClose = () => {
        setIsDashboardPublishOpen(false)
    }

    const handleAddTile = () => {
        setIsAddTileOpen(true)   
    }

    const handleClose = () => {
        setIsAddTileOpen(false)
    }

    const handlePluginSelection = (plugin: any) => {
        setSelectedPlugin(plugin)
    }

    const handleTileSelection = useCallback(() => {
        setIsAddTileOpen(false)
        if(selectedPlugin){
            Promise.all([loadPlugin(selectedPlugin)])
                .then((resolvedPlugins) => {
                    setLoadedPlugins([...loadedPlugins, ...resolvedPlugins])
                })
        }else{
            console.log('No plugin selected!')
        }
    }, [loadedPlugins, selectedPlugin])

    const handleDashboardPublish = () => {
        setIsDashboardPublishOpen(true)
    }

    const handlePublish = useCallback(() => {
        if(dashboardName && layoutValue){
            setSavedDashboardValues([...savedDashboardValues, {dashboardName: dashboardName, pluginLayouts: layoutValue}])
            setIsDashboardPublishOpen(false)
            setOpenSnackbar(true)
        }
    }, [layoutValue, dashboardName, savedDashboardValues, setSavedDashboardValues])

    const handleDashboardNameChange = (event: any) => {
        if(event && event.target.value){
            setDashboardName(event.target.value)
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <AUITypography kind="sectionSubtitle" className={classes.title}>
                        Dashboard Maker
                    </AUITypography>
                    <Button onClick={handleDashboardPublish}>
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
                        <DashboardGridLayout plugins={loadedPlugins} />
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
                                        <Grid item xs={3} key={plugin.key}>
                                            <Card onClick={() => handlePluginSelection(plugin)} className={plugin.key === selectedPlugin.key ? classes.selectedPlugin : ''}>
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
                        <Button variant="contained" color="primary" onClick={() => handleTileSelection()} disabled={isEmpty(selectedPlugin)}>
                            <Trans>Add</Trans>
                        </Button>
                    </DialogActions>
            </Dialog>

            <Dialog
                open={isDashboardPublishOpen}
                onClose={handleDashboardPublishClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <DialogTitle>
                        <AUITypography kind="sectionSubtitle">Save as a Dashboard</AUITypography>
                    </DialogTitle>
                    <DialogContent>
                        <AUITypography kind="sectionTextGray">
                            You can view the saved dashboard via the Dashboard Viewer
                        </AUITypography>
                        <TextField id="dashboardName" label="Dashboard Name" value={dashboardName} onChange={handleDashboardNameChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDashboardPublishClose}>
                            <Trans>Cancel</Trans>
                        </Button>
                        <Button variant="contained" color="primary" disabled={isEmpty(dashboardName)} onClick={() => handlePublish()}>
                            <Trans>Add</Trans>
                        </Button>
                    </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                    Custom dashboard created!
                </MuiAlert>
            </Snackbar>
        </>
    )
}