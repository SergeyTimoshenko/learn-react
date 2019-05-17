import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Root from './root/root';

class App extends React.Component{

  render () {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={Root}/>
        </Router>
      </div>
    );
  }
}

export default App;
