import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css';
import Header from './components/Header'
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles (() => ({
  App: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh"
  }
}))


function App() {
  
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <nav >
          <h1> This React Routing thing is pretty cool</h1>
          <Link to= "/" Header> </Link>
          <Link to= "/coins" Homepage> </Link>
          <Link to= "/coins/:id" Coinpage> </Link>
        </nav>
          <Routes>
            <Route path = '/' element={<Header />}/>
            <Route path = '/coins' element = {<Homepage />}/>
            <Route path = '/coins/:id' element = {<Coinpage />} />
          </Routes>
      
      </div>
    </BrowserRouter>
    
  );
}

export default App;
