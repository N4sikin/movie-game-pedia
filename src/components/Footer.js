import { 
    AppBar,
    Toolbar,
    Link } from "@mui/material"
    
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        main: '#1976d2',
        },
    },
    a: {
        color: '#fff',
        textDeration: 'none'
    }
    });

const Footer = () => {

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                        2022 | Design By <Link  href='https://gitlab.com/khoirun.nasikin' target='_blank' sx={{ color: '#fff', textDecoration: 'none', marginLeft: '5px', fontWeight: 'bold' }}>Khoirun Nasikin</Link>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Footer