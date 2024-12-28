import React from 'react'
import parse from 'html-react-parser';
import makeStyles from '@mui/styles/makeStyles';
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {CryptoState} from "../CryptoContext"
import {SingleCoin} from "../config/api"
import CoinInfo from "../components/CoinInfo"
import { LinearProgress, Typography } from '@mui/material'
import { numberWithCommas } from '../components/Banner/Carousel';

const Coinpage = () => {

  const [coin, setCoin] = useState()
  const {currency, symbol} = CryptoState()
  const {id} = useParams()

  useEffect(() => {
    const fetchCoin = async() => {
      fetch(SingleCoin(id))
      .then(res => res.json())
      .then(data => setCoin(data))
    }
    fetchCoin()
  }, [id]) //this hook fetches data about a specific coin when a user navigates to that coin's page. Dependency array [id] prevents unnecessary re-fetching unless id changes.


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
      flexDirection: "column",
      width: "30%",
      marginTop: 50,
      padding: 15,
      borderRight: "1px solid white",
    },

    heading: {
      fontWeight: "bold",
      textDecoration: "underline"
    },

    description: {
      width: "100%",
      fontFamily: "Segoe UI",
      fontWeight: "inherit",
    }, 

    marketData :{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: "10%",
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
            {parse(coin?.description.en.split(". ")[0])}
        </Typography>
      
        <div className = {classes.marketData}>
          <span>
            <Typography variant ="outline" className = {classes.heading}>
              Rank: &nbsp;
            </Typography>
            
            <Typography variant ="">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span>
            <Typography variant ="outlined" className = {classes.heading}>
              Current Price: &nbsp;
            </Typography>
            
            <Typography variant ="outlined">
              {symbol}{' '}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span>
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
