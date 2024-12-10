import React, { useState } from "react"
import {CryptoState} from '../CryptoContext'

const CoinInfo = () => {

    const [historicalData, setState] = useState()
    const [days, setDays] = useState(1)

    const {} = CryptoState()

    return (
        <div>
            CoinInfo
        </div>
    )
}

export default CoinInfo