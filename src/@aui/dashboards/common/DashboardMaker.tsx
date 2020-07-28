import React, { useState } from 'react'
import { AppBar, Toolbar, Button, makeStyles, Dialog, DialogTitle, DialogActions, DialogContent, Grid, Card, CardContent } from '@material-ui/core'
import { AUITypography } from '@aui/util'
import { Trans }  from '@lingui/macro'
import GridLayout from 'react-grid-layout'
import plugins from '@aui/app/plugins/plugin.json'
import { lightOrange } from '@aui/util'
import isEmpty from 'lodash/isEmpty'


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

    const layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
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

    const handleTileSelection = () => {
        setIsAddTileOpen(false)
    }

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
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div key="a">a</div>
                <div key="b">b</div>
                <div key="c">c</div>
            </GridLayout>

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