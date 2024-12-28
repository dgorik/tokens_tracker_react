import React, { useEffect, useState } from 'react'
import makeStyles from '@mui/styles/makeStyles';
import {TrendingCoins} from '../../config/api'
import { CryptoState } from '../../CryptoContext';
import {Link} from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';

const useStyles = makeStyles(() => ({
    carousel: {
       height: "50%", 
       display: "flex",
       alignItems: "center",
       width: "80%"
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color:"white"
    },
    price: {
        fontWeight: "bold"
    }
}))

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


const Carousel = () => {

    const [trending, setTrending] = useState([]) //here we are initializing a state variable trending and setting it to an empty array at first. We will use this variable to store the coins that we will be fetching from the API 

    const classes = useStyles() //this hook will help us manage styles in more organized and efficient way

    const {currency, symbol} = CryptoState() //here we are 

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            // const {data} = await axios.get(TrendingCoins(currency))
        
            // setTrending(data)
            fetch(TrendingCoins(currency))
            .then(res => res.json())
            .then(data => setTrending(data))
            .catch(error => alert(`Error: ${error}`))
        }

        fetchTrendingCoins();
    },[currency])

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0 //this returns a sign depending on whether a profit is negative or positive
        return (
            <Link className = {classes.carouselItem} to = {`/coins/${coin?.id}`}>
                <img
                src={coin?.image}
                alt={coin?.name}
                height = "80"
                style = {{marginBottom: 10}}>
                </img>
                <span>
                    {coin?.symbol.toUpperCase()}
                    <span
                    style ={{
                        color: profit > 0? "green": "red",
                        font: 500,
                    }}>
                    {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)} {"%"}
                    </span>
                </span>
                <span className = {classes.price}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items:4,
        },
        812: {
            items:6,
        },
    }


    return (
        <div className = {classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval = {1000}
            animationDuration = {1500}
            disableDotsControls
            disableButtonsControls
                responsive = {responsive}
                autoPlay
                items ={items}
            >
        </AliceCarousel>
        </div>
    )
}

export default Carousel
