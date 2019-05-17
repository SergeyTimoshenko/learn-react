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
                                <Button variant="outlined" style={{color: '#fff'}} onClick={() => this.setState({name: 'Home'})}>
                                    Home
                                </Button>
                            </Link>
                            
                        </ListItem>
                        <ListItem>
                        <Link to="/todo" style={{
                                textDecoration: 'none'
                            }}>
                                <Button variant="outlined" style={{color: '#fff'}} onClick={() =>  this.setState({name: 'ToDo'})}>
                                    todo
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