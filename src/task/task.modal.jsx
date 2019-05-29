import React from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

class Task extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            topic: props.topic
        }
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
                        width: 300,
                        left: 'calc(50vw - 150px)',
                    }}>
                    {console.log(this.props)}
                        <Card style={{
                            padding: 20
                        }}>
                            <h3>{this.props.todo.name}</h3>
                            <h5> <i style={{
                                color: 'rgb(142, 139, 139)'
                            }}>in column</i> {this.state.topic.title}</h5>
                        </Card> 
                    </div>
                    
                </Modal>
        )
    }
}

export default Task