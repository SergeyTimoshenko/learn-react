import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TodosService from '../../srvices/todos';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: props.todo
        }
    }
    componentDidMount() {
        // TodosService.fetchAll().then(todos => {
        //     this.setState({todos})
        // })
    }
    onCheck = () => {
        TodosService.check(this.state.todo._id, !this.state.todo.complete).then(res => {
            this.setState({
                todo: {
                    ...this.state.todo,
                    complete: !this.state.todo.complete
                }
            })
        })
        
    }
    
    render() {
        const { todo } = this.state;
        return (
            <div className="todo-wrap">
                <Checkbox checked={todo.complete} onChange={this.onCheck} />
                <div>{todo.name}</div>
                <IconButton aria-label="Delete" style={{
                    marginLeft: 'auto'
                }} onClick={() => this.props.delete(todo._id)} >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
        )
    }
}

export default Todo;