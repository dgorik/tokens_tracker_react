import React, { useState, useEffect } from "react"
import makeStyles from '@mui/styles/makeStyles';
import {CryptoState} from '../CryptoContext'
import axios from 'axios';
import { HistoricalChart} from '../config/api'
import { ThemeProvider} from "styled-components";
import { CircularProgress, createTheme, Typography } from "@mui/material";
import { chartDays } from "../config/data";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2"
import { CategoryScale } from "chart.js";
import SelectButton from "./SelectButton";

Chart.register(CategoryScale);

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
        },
        button_position : {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: '100%'
        },
        button_style : {
            padding: 10, 
            marginLeft: 10, 
            backgroundColor: "gold", 
            fontWeight: "bold",
            borderWidth: "0",
            borderRadius: "7px"
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


    useEffect(() => {
        const fetchHistoricData = async () => {
            const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
            setflag(true);
            setHistoricData(data.prices)
        }
        
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
                            let time = date.getHours() < 12? `${date.getHours()} AM`: `${date.getHours() - 12} PM`
                            return days === 1? time: date.toLocaleDateString()
                        }),
                        datasets: [
                            {
                                data: historicData?.map((coin) => coin[1]),
                                label:`Price in the past ${days} Days`,
                                borderColor: "green",
                                pointRadius: 1,
                            } 

                        ]
                    }}
                />
                <div className = {classes.button_position}> 
                    {chartDays.map((day) =>(
                    <SelectButton
                        key = {day.value}
                        onClick = {() => {
                            setDays(day.value)
                            setflag(false);
                        }}
                        selected = {day.value === days}
                    >
                    {day.label}
                    </SelectButton>
                ))}
                </div>
                </>
                )}
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo