import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import NavBar from './components/NavBar';
import XmlParametrizer from './components/XmlParametrizer';
import BoiTools from './components/BoiTools';

function App() {
  return (    
      <Router>
      <div className="container">      
        <NavBar/>
        <br/>  
        <Route path="/" exact component={BoiTools} /> 
        <Route path="/xmlparametrizer" component={XmlParametrizer}/>            
      </div>
      </Router>
    );  
}

export default App;
