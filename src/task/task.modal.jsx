import React from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Assignment, Subject, Comment } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class Task extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            topic: props.topic
        }
    }
    resetMargin = {
        margin: 0
    }
    render() {
        return (
            <Modal open={this.props.modal} onBackdropClick={() => {this.props.closeModal()}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                
                    <div style={{
                        position:'absolute',
                        top:200,
                        width: 600,
                        left: 'calc(50vw - 300px)',
                    }}>
                    {console.log(this.props)}
                        <Card style={{
                            padding: 20
                        }}>
                            <Grid container spacing={8}>
                                <Grid item xs={1}>
                                    <Assignment />
                                </Grid>
                                <Grid item xs={11}>
                                    <h3 style={this.resetMargin}>{this.props.todo.name}</h3>
                                    <h5> <i style={{
                                        color: 'rgb(142, 139, 139)'
                                    }}>in column</i> {this.state.topic.title}</h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8}>
                                <Grid item xs={1}>
                                    <Subject />
                                </Grid>
                                <Grid item xs={11}>
                                    <h3 style={this.resetMargin}>Description</h3>
                                    <Paper className="card-descroption">
                                        <Typography component="p">
                                            Some description
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} style={{marginTop: 20}}>
                                <Grid item xs={1}>
                                    <Comment />
                                </Grid>
                                <Grid item xs={11}>
                                    <h3 style={this.resetMargin}>Add Comment</h3>
                                    <TextField
                                        label="Comment..."
                                        multiline
                                        variant="outlined"
                                        id="mui-theme-provider-outlined-input"
                                        style={{marginTop: 20, width: '100%'}}
                                    ></TextField>
                                </Grid>
                            </Grid>
                            
                        </Card> 
                    </div>
                    
                </Modal>
        )
    }
}

export default Task