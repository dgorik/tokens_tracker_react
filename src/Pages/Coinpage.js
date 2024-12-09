import React from 'react'
import axios from 'axios'
import makeStyles from '@mui/styles/makeStyles';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {CryptoState} from "../CryptoContext"
import {SingleCoin} from "../config/api"
import CoinInfo from "../components/CoinInfo"
import { LinearProgress, Typography } from '@mui/material'
import { numberWithCommas } from '../components/Banner/Carousel';

const Coinpage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = CryptoState()

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id))
    console.log(data)

    setCoin(data)
  }

  const useStyles = makeStyles(() => ({
    sidebar:{
      display: "flex",
      alignItems: 'center',
      flexDirection: "column",
    },

    heading: {
      color: "white",
    },

    description: {
      width: "100%",
      fontFamily: "Segoe UI",
      padding: 25,
      fontWeight: "inherit",
      textAlign: "justify"
    }, 
    marketData :{
      alignSelf: "start", 
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    fetchCoin()
  }, [])

  if(!coin) return <LinearProgress style ={{backgroundColor:"green"}}/>

  return (
    <div className = {classes.sidebar}>

     <img
        src = {coin?.image.large}
        alt = {coin?.name}
        height = "200"
        style = {{marginBottom: 20}}
     />
     <Typography variant ="h3" className= {classes.heading}>
        {coin?.name}
     </Typography>
     <Typography variant ="span" className= {classes.description}>
        {coin?.description.en.split(".").splice(0,2)}
     </Typography>
  
    <div className = {classes.marketData}>
      <span style = {{display: "flex"}}>
        <Typography variant ="h4" className = {classes.heading}>
          Rank:&nbsp;
        </Typography>
        <Typography variant ="h4" className = {classes.heading}>
          {coin?.market_cap_rank}
        </Typography>
      </span>

      <span style = {{display: "flex"}}>
        <Typography variant ="h4" className = {classes.heading}>
          Current Price:&nbsp;
        </Typography>
        <Typography variant ="h4" className = {classes.heading}>
          {symbol + numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
        </Typography>
      </span>

      <span style = {{display: "flex"}}>
        <Typography variant ="h4" className = {classes.heading}>
          Market Cap:&nbsp;
        </Typography>
        <Typography variant ="h4" className = {classes.heading}>
          {symbol + numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}
        </Typography>
      </span>

    </div>
    </div>
  )
}

export default Coinpage
