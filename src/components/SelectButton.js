import React from 'react'
import makeStyles from '@mui/styles/makeStyles';

const SelectButton = ({children, selected, onClick}) => {
    const useStyles = makeStyles((theme) => ({
        button_style : {
            padding: 10, 
            marginLeft: 10, 
            backgroundColor: "gold", 
            fontWeight: "bold",
            borderWidth: "0",
            borderRadius: "7px",
            color: "grey"
        }
    }))

    const classes = useStyles()

    return (
        <span onClick = {onClick} className = {classes.button_style}>
            {children}
        </span> 
    )
}

export default SelectButton
