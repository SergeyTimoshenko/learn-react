import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import Todo from './todo/todo';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import "./todos.css";
import Task from '../task/task.modal';

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
            topic: props.topic,
            modal: false,
            currentTodo: null
        }
    }
    componentDidMount() {
        
        TodosService.fetchById(this.state.topic._id).then(todos => {
            this.setState({todos})
        })
    }
    onAddTodo = (topic) => {
        this.setState({
            isInput: false
        })
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
    
    
    onCreateTask = () => {
        
        this.setState({
            modal: true
        })
        console.log('yay', this.state.modal)
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    onTodoClick = (todo) => {
        this.setState({
            currentTodo: todo,
            modal: true
        })
    }

    render() {
        return (
            <div className="todos-wrap">
                <Card style={{
                    maxWidth: '300px',
                    minWidth: '300px',
                    borderBottomLeftRadius:0,
                    borderBottomRightRadius:0
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
                                        fontSize: '1.5em',
                                        paddingLeft: 5
                                    }} 
                                    onChange={(e) => {this.setState({input:e.target.value})}}
                                    />
                                    <Button color="inherit" onClick={() => this.onAddTodo(this.state.topic)} style={{
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
                                    <Todo todo={todo} delete={this.onDelete} click={this.onTodoClick} />
                                </ListItem>
                            )
                        }
                    </List>
                    <Link style={{
                        cursor: 'pointer'
                    }} onClick={this.onCreateTask}>Create new task</Link>
                </Card>
                {this.state.currentTodo ? (
                    <Task modal={this.state.modal} closeModal={this.closeModal} todo={this.state.currentTodo} topic={this.state.topic} />
                ):null}
                
            </div>
        );
    }
}
export default ToDos;