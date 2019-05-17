import React from 'react';
import Header from '../header/Header';
import ToDos from '../todos/ToDos';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          name: 'Home'
        }
      }
      
      nav = (to) => {
          console.log(to)
       this.setState({
         name: to
       })
      }
    
      Home = () => {
        return (<h1>Home</h1>)
      }
    
      render () {
        return (
          <div>
            <Header push={this.props.history.push} name={this.state.name} nav={this.nav}></Header>
            <Switch>
              <Route path="/" exact component={this.Home}/>
              <Route path="/todo" component={ToDos} />
            </Switch>
          </div>
        );
      }
}

export default Root;