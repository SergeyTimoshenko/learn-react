import React from 'react';
import Todo from '../todos/todo/todo';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Topic extends React.Component {
    constructor (props) {
        super(props)
        console.log(props)
        this.state = {
            // title: props.topic.title,
            todos: [],
            isInput: false,
            input: ''
        }
    }

    render() {
        return (
            <div>
                <Card style={{
                            maxWidth: '300px',
                            minWidth: '300px',
                            marginLeft: '15px'
                        }}>
                            <CardActions>
                                
                                {
                                    this.state.isInput ? (
                                        <div style={{
                                            display: 'flex',
                                            width: '100%'
                                        }}>
                                            <input type="text" value={this.state.input} style={{
                                                width: '100%',
                                                height: '30px',
                                                borderRadius: 7,
                                                border: '2px solid #3f51b5',
                                                fontSize: 25,
                                                paddingLeft: 5
                                            }} 
                                            onChange={(e) => {this.setState({input:e.target.value})}}
                                            />
                                            <Button color="inherit" onClick={() => this.onAddTodo('')} style={{
                                                marginLeft: 10
                                            }}>
                                                add
                                            </Button>   
                                        </div>
                                        
                                    ) : (
                                        <Button color="inherit" onClick={this.showInput}>
                                            <AddIcon />
                                        </Button>
                                    )
                                }
                            </CardActions>
                            <List>
                                {
                                    this.state.todos.map((todo, index) => 
                                        <ListItem key={todo._id}>
                                            <Todo todo={todo} delete={this.onDelete}/>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Card>
            </div>
        )
    }

}

export default Topic;