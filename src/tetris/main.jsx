import React from 'react'
import Area from './area';

class Tetris extends React.Component {

    

    render() {
        return (
            <div>
                <div style={{
                    width: 221,
                    height: 441,
                    border: '1px solid black',
                    margin: '0 auto'
                }}>
                    <Area />
                </div>
               
            </div>
        )
    }
}

export default Tetris