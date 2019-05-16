import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        { this.state.name }
                    </Typography>
                </Toolbar>
            </AppBar>
        </header>
        )
    }
}

export default Header