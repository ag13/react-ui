import React, { useState, Suspense } from 'react'
import { AUITypography } from '@aui/util'
import { useLocalStorage } from '@aui/common/useLocalStorage'
import { AppBar, Toolbar, makeStyles, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { loadPlugin } from '@aui/app/plugins'
import GridLayout from 'react-grid-layout'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }))

export const DashboardViewer = () => {
    const classes = useStyles()
    const [savedDashboards] = useLocalStorage('savedDashboard', [])
    const [loadedPlugins, setLoadedPlugins] = useState<any>([])
    const [layout, setLayout] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleDrawerOpen = () => {
      setIsDrawerOpen(!isDrawerOpen)
    }

    const handleDashboardOpen = (savedDashboard: any) => {
        const { pluginLayouts } = savedDashboard
        const componentPromises = pluginLayouts.map(async (pluginLayout: any) => {
          return loadPlugin(pluginLayout.plugin)
        })

        const layouts = pluginLayouts.map((pluginLayout: any) => {
          return {...pluginLayout.layout, static: true, isDraggable: false}
        })
        setLayout(layouts)
        setIsDrawerOpen(false)

        Promise.all(componentPromises).then(setLoadedPlugins)
    }

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <MenuIcon />
              </IconButton>
                <AUITypography kind="sectionTitle" noWrap>
                    Dashboard Viewer
                </AUITypography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                <List>
                    {savedDashboards.map((savedDashboard: any, index) => (
                    <ListItem button key={savedDashboard.dashboardName} onClick={() => handleDashboardOpen(savedDashboard)}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={savedDashboard.dashboardName} />
                    </ListItem>
                    ))}
                </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {loadedPlugins && loadedPlugins.length ?
                (
                    <Suspense fallback="Loading grid">
                      <GridLayout className="layout" layout={layout} width={1200} cols={12} isDraggable={false} isResizable={false}>
                          {
                              loadedPlugins.map((plugin: any, index: any) => (                            
                                  <div key={plugin.key}>{plugin}</div>
                              ))
                          }
                      </GridLayout>
                    </Suspense>
                ) : null
              }
            </main>
      </div>
    )
}