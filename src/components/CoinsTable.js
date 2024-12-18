import React, {useEffect, useState} from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { createTheme, LinearProgress, TableContainer, TableHead, Table, TableRow, TextField, ThemeProvider, Container, Typography, TableCell, TableBody, Pagination} from '@mui/material';
import { CoinList } from '../config/api'
import {CryptoState} from "../CryptoContext"
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import axios from 'axios';

export default function CoinsTable() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const [page, setPage] = useState(1)

  const {currency, symbol} = CryptoState()

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#B8B8B8"
      }
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
        fontWeight: "bold"
      },
    }
  }));

  const navigate = useNavigate()
  const classes = useStyles()

  const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        type: "dark"
    }
  })

  useEffect(() => {
    const fetchCoins = async () => {

      setLoading(true)
      const {data} = await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
  
    }  
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
            sx = {{
              "& .MuiOutlinedInput-root": {
                  color: "white",
                  fontFamily: "Arial",
                  fontWeight: "bold",
              },
              "& .MuiInputLabel-outlined": {
                  color: "#2e2e2e",
                  fontWeight: "bold",
            },
            }}
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
                                  <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return  (
                                      <TableRow
                                        onClick = {() => navigate(`/coins/${row.id}`)}
                                        className = {classes.row}
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

                                            <span style = {{
                                              width: "5px", 
                                              color: "white"
                                            }}>
                                                {row?.symbol.toUpperCase()}
                                            </span>
                                            
                                         </TableCell>

                                         <TableCell>
                                          <div style = {{color: "white"}}>
                                            {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                                          </div>
                                         </TableCell>

                                         <TableCell style = {{ color: profit > 0 ? "green" : "red"}}>
                                          
                                          {symbol} {numberWithCommas(row.price_change_24h.toFixed(3))}
                                          
                                         </TableCell>

                                         <TableCell>
                                          <div style = {{color: "white"}}>
                                          {symbol} {numberWithCommas(row.market_cap)}
                                          </div>
                                         </TableCell>

                                         

                                      </TableRow>
                                    )
                                  })}
                                  </TableBody>
                        </Table>
                  )
                }
            </TableContainer>

            <Pagination
              classes= {{ul: classes.pagination}}
              style = {{
                display: "flex",
                justifyContent: "center",
              }}
              count = {(handleSearch()?.length / 10).toFixed(0)}
              onChange = {(_, value) => {
                setPage(value)
                window.scroll({
                  top: 100,
                  left: 100,
                  behavior: "smooth",
                })
              }}
            />

        </Container>
    </ThemeProvider>
  )
}
