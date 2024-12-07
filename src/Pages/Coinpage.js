import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {CryptoState} from "../CryptoContext"
import {SingleCoin} from "../config/api"
import CoinInfo from "../components/CoinInfo"

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
      src = {coin?.image.small}
      alt = {coin?.name}
     />
    </div>
  )
}

export default Coinpage
