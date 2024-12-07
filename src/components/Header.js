import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Toolbar, AppBar, Container, Typography, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title_1: {
        color: "gold",
        fontFamily: "Roboto",
        fontWeight: "bold",
        cursor: "pointer",
        marginRight: "10px",
        
    },
    title_2: {
        color: "blue",
        fontFamily: "Roboto",
        fontWeight: "bold",
        cursor: "pointer",

    },
    header: {
        display: "flex",
        justifyContent: 'center',
        flexDirection: "row",
        color: "blue",
    }
}))

const Header = () => {

    const navigate = useNavigate();

    const classes = useStyles();

    const {currency, setCurrency} = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        }
    })

    const handleClick = () => {
        // Navigate to a new route
        navigate('/');
      };
    

    return (
        <ThemeProvider theme = {darkTheme}>
            <AppBar color = "transparent" position = "static">
                <Container>
                    <Toolbar>
                    <div className= {classes.header}>
                        <div className = {classes.title_1}>
                            <Typography onClick={handleClick} variant = "h6">
                                CryptoTracker
                            </Typography>
                        </div>

                        <div className = {classes.title_2}>
                            <Typography onClick={handleClick} variant = "h6">
                                TO THE MOON 
                            </Typography>
                        </div>
                        <Select variant = "outlined"
                            style = {{
                            color: "white",
                            width: 90,
                            height: 40, 
                            position: 'fixed',
                            top: 10,
                            right: 15,
                            }}
                            value = {currency}
                            onChange = {(e) => setCurrency (e.target.value)}
                            >
                            <MenuItem value = {'USD'}> USD </MenuItem>
                            <MenuItem value = {'EUR'}> EUR </MenuItem>
                        </Select>
                    </div>
                        
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
        
    )
}

export default Header
