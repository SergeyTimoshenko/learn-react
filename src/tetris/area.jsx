import React from 'react';

class Area extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: this.row(),
            interval: null
        }
    }

    figure = 'block';

    row = () => {
        let rows = []
        for(let i = 0; i < 20; i++) {
            rows.push({id:i, col:[], is: false})
            for (let a = 0; a < 10; a++) {
                rows[i].col.push({is:false, id: a})
            }
        }
        return rows
    }

    start() {
        this.live()
    }
    stop() {
        clearInterval(this.state.interval)
    }
    live() {
        this.setState({interval: setInterval(() =>{
            if (this.figure === 'block') {
                
            }
        }, 500)})
    }
    clicker (rowId, colId) {
        this.setState({
            rows: this.state.rows.map(row => {
                if (row.id !== rowId) return row
                return {...row, col:row.col.map(col => {
                    if (col.id !== colId) return col
                    col = {...col, is: true}
                    return col
                })}
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.rows.map(row => (
                    <div key={row.id} style={{
                        width: '100%',
                        height: 20,
                        border: '1px solid black',
                        display: 'flex'
                    }}>
                        {row.col.map(col => (
                            <div key={col.id} style={{
                                height: 20,
                                width: 20,
                                border: '1px solid black',
                                backgroundColor: col.is ? 'black' : '#fff'
                            }}
                            onClick={() => this.clicker(row.id, col.id)}
                            ></div>
                        ))}
                    </div>
                    
                ))}
                <button onClick={()=>this.start()}>start</button>
                <button onClick={() => this.stop()}>stop</button>
            </div>
        )
    }
}
export default Area;