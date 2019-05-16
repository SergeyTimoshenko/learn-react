import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TodosService from '../../srvices/todos';

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: props.todo
        }
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
        return (
            <div>
                <Checkbox checked={this.state.todo.complete} onChange={this.onCheck} />
                {this.state.todo.name}
            </div>
        )
    }
}

export default Todo;