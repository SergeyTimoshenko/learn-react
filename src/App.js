import React from 'react';
import './App.css';
import Header from './header/Header';
import ToDos from './todos/ToDos';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Root from './root/root';

class App extends React.Component{

  render () {
    return (
      <div className="App">
        
        <Router>
          <Route path="/" component={Root}/>
        </Router>
        
        {/* <ToDos></ToDos> */}
      </div>
    );
  }
}

export default App;
