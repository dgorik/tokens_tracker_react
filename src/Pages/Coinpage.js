import React from 'react'
import axios from 'axios'
import makeStyles from '@mui/styles/makeStyles';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {CryptoState} from "../CryptoContext"
import {SingleCoin} from "../config/api"
import CoinInfo from "../components/CoinInfo"
import { LinearProgress, Typography } from '@mui/material'
import { numberWithCommas } from '../components/Banner/Carousel';

Chart.register(CategoryScale);

const Coinpage = () => {

  const {id} = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = CryptoState()

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])


  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      // [theme.breakpoints.down("md")]: {
      //   flexDirection: "column",
      //   alignItems: "center",
      // }
    },
    sidebar:{
      display: "flex",
      alignItems: 'center',
      flexDirection: "column",
      width: "30%",
      marginTop: 50,
      borderRight: "1px solid white",
    },

    heading: {
      fontWeight: "bold",
      textDecoration: "underline"
      
    },

    description: {
      width: "100%",
      fontFamily: "Segoe UI",
      padding: 15,
      fontWeight: "inherit",
      textAlign: "justify"
    }, 
    marketData :{
      alignSelf: "start", 
    // width: "100%",
      //padding: 10,
    }
  }));

  const classes = useStyles();

  if(!coin) return <LinearProgress style ={{backgroundColor:"green"}}/>

  return (
    <div className={classes.container}>
      <div className = {classes.sidebar}>

        <img
            src = {coin?.image.large}
            alt = {coin?.name}
            height = "200"
            style = {{marginBottom: 20}}
        />
        <Typography variant ="h4" className= {classes.heading}>
            {coin?.name}
        </Typography>
        <Typography variant ="span" className= {classes.description}>
            {coin?.description.en.split(".").splice(0,2)}
        </Typography>
      
        <div className = {classes.marketData}>
          <span style = {{display: "flex"}}>
            <Typography variant ="outline" className = {classes.heading}>
              Rank: &nbsp;
            </Typography>
            
            <Typography variant ="">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style = {{display: "flex"}}>
            <Typography variant ="outlined" className = {classes.heading}>
              Current Price: &nbsp;
            </Typography>
            
            <Typography variant ="outlined">
              {symbol}{' '}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style = {{display: "flex"}}>
            <Typography variant ="outlined" className = {classes.heading}>
              Market Cap: &nbsp;
            </Typography>
            
            <Typography variant ="outlined">
            {symbol}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}
            </Typography>
          </span>

        </div>
      </div>
      <CoinInfo coin= {coin} />
    </div>
  )
}

export default Coinpage
