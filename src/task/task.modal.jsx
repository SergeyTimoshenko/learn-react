import React from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

class Task extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {}
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
                        </Card> 
                    </div>
                    
                </Modal>
        )
    }
}

export default Task