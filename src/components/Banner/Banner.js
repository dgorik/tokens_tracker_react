import { Container, Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(./banner_background.jpg)",
    },
    bannerContent: {
       height: 400, 
       display: "flex",
       flexDirection: "column",
       paddingTop: 25,
       justifyContent: "center",
       alignItems: "center"
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      paddingTop: 25, 
      justifyContent: "space-around"
    }
}))

const Banner = () => {
  
  const classes = useStyles()

  return (
    <div className = {classes.banner}>
      <Container className = {classes.bannerContent}>
        <div className = {classes.tagline}>
        <Typography
          variant = "h2"
          style = {{
            fontWeight: "bold", 
            marginBottom: 15, 
            fontFamily: "Poppins",
          }}
          >
            Crypto Hunter
        </Typography>
        <Typography
        variant = "subtitle"
          style = {{
            color: "gold",
            fontFamily: "Poppins"
          }}
          >
          Get the latest data about your favorite cryptocurrency
        </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
