import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {CryptoState} from "../CryptoContext"
import {SingleCoin} from "../config/api"
import CoinInfo from "../components/CoinInfo"
import { Typography } from '@mui/material'

const Coinpage = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()

  const {currency, symbol} = CryptoState()

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id))
    console.log(data)

    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  return (
    <div>

     <CoinInfo/>

     <img
      src = {coin?.image.large}
      alt = {coin?.name}
      height = "200"
      style = {{marginBottom: 20}}
     />
     <Typography variant ="h3">
      {coin?.name}
     </Typography>
     <Typography variant ="span">
      {coin?.description.en.split(".").splice(0,2)}
     </Typography>
  
  
    </div>
  )
}

export default Coinpage
