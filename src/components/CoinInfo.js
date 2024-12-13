import React, { useState, useEffect } from "react"
import makeStyles from '@mui/styles/makeStyles';
import {CryptoState} from '../CryptoContext'
import axios from 'axios';
import { HistoricalChart} from '../config/api'
import { ThemeProvider} from "styled-components";
import { CircularProgress, createTheme, Typography } from "@mui/material";
import { chartDays } from "../config/data";
import { Line } from "react-chartjs-2"

const CoinInfo = ({coin}) => {

    const [historicData, setHistoricData] = useState([])
    const [days, setDays] = useState(1)
    const {currency} = CryptoState()
    const [flag, setflag] = useState(false);

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

    useEffect(() => {
        fetchHistoricData();
    }, [days]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className = {classes.container}>
                {!historicData || flag===false ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : ( 
                <>
                {console.log(historicData)}
                <Line
                    data = {{
                        labels: historicData?.map((coin) => {
                            let date = new Date(coin[0]);
                            let time = date.getHours()
                        }),
                        datasets: [
                            {data: historicData.map((coin) => coin[1])}
                        ]
                    }}
                />
                </>
                )}
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo