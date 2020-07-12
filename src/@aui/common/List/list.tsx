import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

const AUIList = () => {
    return (
        <List component="nav">
            <ListItem button>
                <ListItemText primary="India"></ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemText primary="United States of America"></ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemText primary="United Kingdom"></ListItemText>
            </ListItem>
        </List>
    )
}

export default AUIList