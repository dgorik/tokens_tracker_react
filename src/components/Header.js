import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Toolbar, AppBar, Container, Typography, Select, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    title: {
        color: "white",
        fontFamily: "Roboto",
        fontWeight: "bold",
        cursor: "pointer"
    },
}))

const Header = () => {

    const navigate = useNavigate()

    const classes = useStyles()

    const handleClick = () => {
        // Navigate to a new route
        navigate('/');
      };
    

    return (
        <AppBar color = "primary" position = "static">
            <Container>
                <Toolbar>
                    <div className = {classes.title}>
                        <Typography onClick={handleClick}>
                            CryptoTracker
                        </Typography>
                    </div>
                    <Select variant = "outlined"
                    style = {{
                        width: 50,
                        height: 40, 
                        marginLeft: 10,
                        position: 'fixed',
                        top:10,
                        right:10,
                    }}>
                        <MenuItem value = {'USD'}> USD </MenuItem>
                        <MenuItem value = {'EUR'}> EUR </MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
