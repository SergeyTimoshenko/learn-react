import React from 'react';
import Todo from '../todos/todo/todo';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ToDos from '../todos/ToDos';
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

    render() {
        return (
            <div>
                <Card style={{
                    maxWidth: '300px',
                    minWidth: '300px',
                    marginLeft: '15px'
                }}>
                {
                    this.state.isInput ? (
                        <input type="text" value={this.state.input} style={{
                            width: '200px',
                            height: '30px',
                            borderRadius: 7,
                            border: '2px solid #3f51b5',
                            fontSize: 25,
                            paddingLeft: 5
                        }} 
                        onChange={(e) => {this.setState({input:e.target.value})}}
                        onTouchEnd={() => {
                            console.log('yays')
                        }}
                        />
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