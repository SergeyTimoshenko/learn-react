import React from 'react';
import Todo from '../todos/todo/todo';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ToDos from '../todos/ToDos';
import TopicService from '../srvices/topic';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class Topic extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            todos: [],
            isInput: false,
            input: props.topic.title,
            topic: props.topic
        }
    }

    onSave = () => {
        console.log(this.state.input)
        TopicService.update(this.state.topic._id, {...this.state.topic, title: this.state.input}).then(res => {
            console.log(res)
            this.setState({
                topic: {
                    ...this.state.topic,
                    title: this.state.input
                },
                isInput: false,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    onDelete = () => {
        this.props.onDelete(this.state.topic._id).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <Card style={{
                    maxWidth: '300px',
                    minWidth: '300px',
                    marginLeft: '15px'
                }}>
                <IconButton onClick={this.onDelete}>
                    <DeleteIcon />
                </IconButton>
                {
                    this.state.isInput ? (
                        <div style={{
                            display: 'flex',
                            marginTop: 20,
                            marginLeft: 10,
                            marginRight: 10
                        }}>
                            <input type="text" value={this.state.input} style={{
                                width: '100%',
                                height: '30px',
                                borderRadius: 7,
                                border: '2px solid #3f51b5',
                                fontSize: 25,
                                paddingLeft: 5,
                                marginRight: 10
                            }} 
                            onChange={(e) => {this.setState({input:e.target.value})}}
                            />
                            <Button
                                onClick={this.onSave}
                            >Save</Button>
                        </div>
                        
                    ) : (
                        <h2 onClick={() => {
                            this.setState({isInput:true})
                        }}>{this.state.topic.title}</h2>
                        
                    )
                }
                
                <ToDos topic={this.state.topic}>

                </ToDos>
                </Card>
                
            </div>
        )
    }

}

export default Topic;