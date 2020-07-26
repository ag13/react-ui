import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core'
import React from 'react'

const theme = createMuiTheme({
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        primary: {
            light: '#FFAB91',
            main: '#FF5722',
            dark: '#D84315',
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
    },
    spacing: 8
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