import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Toolbar, AppBar, Container, Typography, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        color: "gold",
        fontFamily: "Roboto",
        fontWeight: "bold",
        cursor: "pointer"
    },
    header: {
        display: "flex",
        justifyContent: 'space-around',
        flexDirection: "row",
        color: "blue"
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
                        <div className = {classes.title}>
                            <Typography onClick={handleClick} variant = "h6">
                                CryptoTracker
                            </Typography>
                        </div>

                        <div className = {classes.title}>
                            <Typography onClick={handleClick} variant = "h6">
                                TO THE MOOOON 
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
