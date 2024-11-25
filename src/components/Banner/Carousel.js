import React from 'react'
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    carousel: {
       height: "50%", 
       display: "flex",
       alignItems: "center",
    }
}))


const Carousel = () => {

const classes = useStyles()

  return (
    <div className = {classes.carousel}>
      carousel
    </div>
  )
}

export default Carousel
