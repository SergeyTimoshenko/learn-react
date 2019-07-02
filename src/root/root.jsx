import React from 'react';
import Header from '../header/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topics from '../topic/Topics';
import './../style/style.css';
import Tetris from '../tetris/main';
import Snake from '../snake/snake';

class Root extends React.Component {
    constructor(props) {
        super(props)
        let name = '';
        switch (props.location.pathname) {
            case '/todo':
                name = 'ToDo'
                break;
            case '/tetris':
                name = 'Tetris'
                break;
            case '/snake':
                name = 'Snake'
                break;
            default:
                name = 'Home';
                break;
        }
        this.state = {name}
      }
      
      nav = (to) => {
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
              <Route path="/tetris" component={Tetris} />
              <Route path="/snake" component={Snake} />
            </Switch>
          </div>
        );
      }
}

export default Root;