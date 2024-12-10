import React, { useState, useEffect } from "react"
import makeStyles from '@mui/styles/makeStyles';
import {CryptoState} from '../CryptoContext'
import axios from 'axios';
import { HistoricalChart} from '../config/api'
import { ThemeProvider} from "styled-components";
import { CircularProgress, createTheme } from "@mui/material";
import { Line } from "react-chartjs-2"

const CoinInfo = ({coin}) => {

    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)
    const {currency} = CryptoState()
    const [flag,setflag] = useState(false);

    const useStyles = makeStyles((theme) => ({
        container: {
            width: '60%', 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }
    }))

    const classes = useStyles()

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });
    const fetchHistoricData = async () => {
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
        setflag(true);
        setHistoricData(data.prices)
    }

    console.log(coin);

    useEffect(() => {
        fetchHistoricData()
    },[days])

    return (
        <ThemeProvider theme={darkTheme}>
            <div className = {classes.container}>
                {!historicData | flag===false ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : ( 
                <>
                    <Line
                        data={{
                            labels: historicData.map((coin) => {
                                let date = new Date(coin[0])
                                let time =
                                date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                            })
                        }}>

                    </Line>
                </>
                )}
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo