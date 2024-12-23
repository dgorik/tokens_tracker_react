import React, { useContext, useEffect, useState, createContext} from 'react'

const Crypto = createContext() //this enables us to pass the data through a component tree without having to pass props down manually at every level

const CryptoContext = ( {children}) => { //we are defining a component that provides currency, symbol and setCurrency to all its child components
  const [currency, setCurrency] = useState("USD") //here we intialize the currency state with a value "USD"
  const [symbol, setSymbol] = useState("$") //here we initialize the symbol state with a sign '$'

  useEffect(() => { //this function updates the symbol state based on the currency value
    if(currency === "EUR") setSymbol("€")
    else if(currency === "USD") setSymbol("$")
  },[currency]) //[currency] makes sure the effect is only run when currency state changes


  return (
    <Crypto.Provider value = {{currency, symbol, setCurrency}}> 
        {children}
    </Crypto.Provider>
  ) //value prop defines the data that the context sends to other components (this makes these values accessible everywhere inside of our application)
  //children represents any child component passed to crypto context
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto) 
}//Calls the useContext React hook to access the values stored in the Crypto context. 
// Returns those values so they can be used in the calling component.