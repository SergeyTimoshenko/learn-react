import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Todo from './todo/todo';

import "./todos.css";

import TodosService from '../srvices/todos';
import TopicService from '../srvices/topic';

class ToDos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            isInput: false,
            input: '',
            isNewColumnInput: false,
            newColumnInput: '',
            topics: []
        }
    }
    componentDidMount() {
        
        TopicService.fetchAll().then(topics => {
            this.setState({topics})
            topics.map(topic => {
                TodosService.fetchById(topic._id).then(todos => {
                    this.setState({todos})
                })
            })
        })
    }
    onAddTodo = (topic) => {
        this.setState({
            isInput: false
        })
        console.log(topic)
        TodosService.create({name: this.state.input, topic}).then(res => {
            this.setState({
                input: '',
                todos: [
                    {
                        _id: res._id,
                        name: res.name
                    },
                    ...this.state.todos
                ]
            })
        })
        
    }

    showInput = () => {
        this.setState({
            isInput: true
        })
    }

    onDelete = (id) => {
        TodosService.del(id).then(res => {
            this.setState({
                todos: this.state.todos.filter(t => t._id !== id)
            })
        }).catch(err => {
            console.log(err)
        })
        
    }

    showNewColumn = () => {
        this.setState({
            isNewColumnInput: true
        })
    }
    
    onKey = (e) => {
        if(e.key !== 'Enter') return
        TopicService.create({title:this.state.newColumnInput}).then(topic => {
            this.setState({
                isNewColumnInput: false,
                newColumnInput: '',
                topics: [
                    ...this.state.topics,
                    topic
                ]
            })
        })
        
    }

    render() {
        return (
            <div className="todos-wrap">
                
                {
                    this.state.topics.map(topic => 
                        <Card key={topic._id} style={{
                            maxWidth: '300px',
                            minWidth: '300px',
                            marginLeft: '15px'
                        }}>
                            <h3>{ topic.title }</h3>
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
                                            <Button color="inherit" onClick={() => this.onAddTodo(topic)} style={{
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
                        )
                }
                <Card style={{
                    maxWidth: '300px',
                    minWidth: '300px',
                    marginLeft: '15px',
                    maxHeight: this.state.isNewColumnInput ? '100px' : '50px'
                }}>
                    <CardActions style={{
                        flexDirection: 'column'
                    }}>
                        <Button style={{margin: '0 auto'}} onClick={this.showNewColumn}>new column</Button>
                        { this.state.isNewColumnInput ? (
                            <input type="text" value={this.state.newColumnInput} style={{
                                width: '100%',
                                height: '30px',
                                borderRadius: 7,
                                border: '2px solid #3f51b5',
                                fontSize: 25,
                                paddingLeft: 5,
                                margin: '10px'
                            }}
                            onKeyUp={this.onKey}
                            onChange={(e) => {this.setState({newColumnInput:e.target.value})}}
                            />
                        ) : null}
                    </CardActions>
                </Card>
            </div>
        );
    }
}
export default ToDos;