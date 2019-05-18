import React from 'react';
import TodosService from '../srvices/todos';
import Topic from './Topic';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import "../todos/todos.css";

class Topics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topics: [],
            isNewColumnInput: false,
            newColumnInput: ''
        }
    }

    showNewColumn = () => {
        this.setState({
            isNewColumnInput: true,
            newColumnInput: ''
        })
    }

    onKey = (e) => {
        if (e.key !== 'Enter') return
        this.setState({
            isNewColumnInput: false
        })
        console.log(this.state.newColumnInput)
    }

    render() {
        return (
            <div className="todos-wrap">
                {
                    this.state.topics.map(topic => 
                        <Topic key={topic._id} topic={topic} />
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
        )
    }
}

export default Topics;