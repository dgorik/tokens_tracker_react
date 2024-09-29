import { Container} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'

const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(./banner_background.jpg)",
    },
    bannerContent: {
       height: 400, 
       display: "flex",
       flexDirection: "column",
       paddingTop: 25,
       justifycontent: "space-around"
    }
}))

const Banner = () => {
  
  const classes = useStyles()

  return (
    <div className = {classes.banner}>
      <Container className = {classes.bannerContent}>
      </Container>
    </div>
  )
}

export default Banner
