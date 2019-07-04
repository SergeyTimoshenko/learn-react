import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    render() {
        return (
        <header>
            <AppBar position="static">
                <Toolbar style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h6" color="inherit">
                        { this.state.name }
                    </Typography>
                    <List style={{
                        display: 'flex',
                    }}>
                        <ListItem>
                            <Link to="/" style={{
                                textDecoration: 'none',
                            }}>
                                <Button variant="outlined" style={{color: '#fff'}} onClick={() => {
                                    this.setState({name: 'Home'})
                                    this.props.push('/')
                                }}>
                                    Home
                                </Button>
                            </Link>
                            
                        </ListItem>
                        <ListItem>
                            <Link to="/todo" style={{
                                    textDecoration: 'none'
                                }}>
                                    <Button variant="outlined" style={{color: '#fff'}} onClick={() =>  {this.setState({name: 'ToDo'}); this.props.push('/todo')}}>
                                        todo
                                    </Button>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/tetris" style={{
                                    textDecoration: 'none'
                                }}>
                                    <Button variant="outlined" style={{color: '#fff'}} onClick={() =>  {this.setState({name: 'Tetris'}); this.props.push('/tetris')}}>
                                        tetris
                                    </Button>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/snake" style={{
                                    textDecoration: 'none'
                                }}>
                                    <Button variant="outlined" style={{color: '#fff'}} onClick={() =>  {this.setState({name: 'Snake'}); this.props.push('/snake')}}>
                                        snake
                                    </Button>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/arcanoid" style={{
                                    textDecoration: 'none'
                                }}>
                                    <Button variant="outlined" style={{color: '#fff'}} onClick={() =>  {this.setState({name: 'Arcanoid'}); this.props.push('/arcanoid')}}>
                                        arcanoid
                                    </Button>
                            </Link>
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
        </header>
        )
    }
}

export default Header