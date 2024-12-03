import React, {useEffect, useState} from 'react'
import { createTheme, LinearProgress, TableContainer, TableHead, Table, TableRow, TextField, ThemeProvider, Container, Typography, TableCell, TableBody} from '@mui/material';
import { CoinList } from '../config/api'
import {CryptoState} from "../CryptoContext"
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import axios from 'axios';

export default function CoinsTable() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const {currency, symbol} = CryptoState()

  // const useStyles = makeStyles(() => ({
  //   row: {
  //     backgroundColor: "#16171a",
  //     cursor: "pointer",
  //   },
  //   pagination: {
  //     backgroundColor: "white",
  //   },

  // }));

  // const classes = useStyles()
  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        type: "dark"
    }
  })

  const fetchCoins = async () => {

    setLoading(true)
    const {data} = await axios.get(CoinList(currency))
    console.log(data)
    setCoins(data)
    setLoading(false)

  }

  useEffect(() => {
    fetchCoins()
  },[currency])

  const handleSearch = () => {
    return coins.filter((coin) => 
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    )
  }

  return (
    <ThemeProvider theme = {darkTheme}>
        <Container style = {{textAlign: "center"}}>
          <Typography
            variant = "h4"
            style = {{margin: 18, fontFamily: "Poppins"}}>
              Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label = "Search For a Crypto Currency.." 
            variant = "outlined"
            style = {{ textAlign: "center", width: "100%"}}
            onChange = {(e) => setSearch(e.target.value)}
            
          
            />
            <TableContainer>
                {loading? (
                    <LinearProgress style = {{backgroundColor: "green"}} />
                  ):(
                        <Table>
                          <TableHead style = {{backgroundColor: "orange"}}>
                              <TableRow>
                              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                      style = {{
                                        color: "black"
                                      }}
                                      key = {head}
                                      //align={head === "Coin" ? "" : "right"}
                                    >
                                      {head}
                                    </TableCell>
                                  ))}
                              </TableRow>
                            </TableHead>
                                  <TableBody>{handleSearch().map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return  (
                                      <TableRow
                                        onClick = {() => navigate(`/coins/${row.id}`)}
                                        // className = {classes.row}
                                        key = {row.name}
                                        >
                                         <TableCell component = "th" scope = "row"
                                            style = {{
                                              display: "flex", 
                                              gap: 15,
                                            }}
                                          >
                                            <img
                                              src = {row?.image}
                                              alt = {row.name}
                                              height = "50"
                                              style = {{marginBottom: 10}}
                                            />
                                            
                                         </TableCell>   
                                      </TableRow>
                                    )
                                  })}
                                  </TableBody>
                        </Table>
                  )
                }
            </TableContainer>

        </Container>
    </ThemeProvider>
  )
}
