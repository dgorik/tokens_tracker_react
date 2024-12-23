//this is the top component of the application. App.js represents the main/top component of the application.

import { BrowserRouter, Routes, Route} from "react-router-dom" // react-router-dom is library that enable routing. This library allows us to define routes.
import './App.css';
import Header from './components/Header'
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles (() => ({
  App: {
    backgroundColor: "#2E2E2E",
    color: "white",
    minHeight: "100vh",
  }
}))


function App() {
  
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <nav >
          {<Header />}
        </nav> 
          <Routes>
            <Route path = '/' element = {<Homepage />}/>
            <Route path = '/coins/:id' element = {<Coinpage />} />
          </Routes>
      
      </div>
    </BrowserRouter>
    
  );
  //Link is similar to achor tags. When you click on the even listener, they change the url, but they do so without refreshing the page
  //Routes is a container for all your route definitions
  //A route defines a single path and a components to render
  

}

export default App;
