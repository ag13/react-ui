import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core'
import React from 'react'

const theme = createMuiTheme({
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        primary: {
            light: '#6fbf73',
            main: '#4caf50',
            dark: '#357a38',
            contrastText: '#fff'
        },
        secondary: {
            light: '#5393ff',
            main: '#2979ff',
            dark: '#1c54b2',
            contrastText: '#FFF'
        }
    },
    typography: {
        fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        fontSize: 14,
    }
})

export const withAUITheme = <P extends {}>(Component: React.ComponentType<P>) => {
    const WithAUITheme: React.FC<P> = (props) => (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...props} />
        </MuiThemeProvider>
    )
    return WithAUITheme
}