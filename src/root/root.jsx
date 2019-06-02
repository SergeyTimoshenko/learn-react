import React from 'react';
import Header from '../header/Header';
import ToDos from '../todos/ToDos';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topics from '../topic/Topics';
import './../style/style.css';

class Root extends React.Component {
    constructor(props) {
        super(props)
        let name = '';
        switch (props.location.pathname) {
            case '/todo':
                name = 'ToDo'
                break;
            default:
                name = 'Home';
                break;
        }
        this.state = {name}
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
            <Header 
                push={this.props.history.push} 
                name={this.state.name} 
                nav={this.nav}></Header>
            <Switch>
              <Route path="/" exact component={this.Home}/>
              <Route path="/todo" component={Topics} />
            </Switch>
          </div>
        );
      }
}

export default Root;