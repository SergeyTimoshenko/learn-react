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
        if (!this.state.interval) this.live()
    }
    stop() {
        clearInterval(this.state.interval)
        this.setState({interval: null})
    }
    downChecker(rowId, colId) {
        if (this.state.rows[rowId + 1].col[colId].is === false) {
            return false
        }
        
        let count = this.state.rows.filter(r => {
            if (r.col.filter(c => {
                if (c.id === colId && c.is) return true
            }).length) return true
        }).length
        
        if (19 - rowId - count < 0) {
            return true
        }
        return false
    }
    renderStoper() {
        
    }
    live() {
        this.setState({interval: setInterval(() => {
            
            let cols = []

            this.state.rows[0].col.map(col => cols.push(false))

            this.setState({rows: this.state.rows.map(row => {
                let newRow;
            
                if (cols.length) {
                    newRow = {...row, col:row.col.map(col => {
                        if (!cols[col.id] && col.is && this.state.rows.length - 1 !== row.id && this.downChecker(row.id, col.id)) {
                            return {...col, is: true}
                        }
                        return {...col, is: cols[col.id]}
                    })}
                    cols = []
                    
                    row.col.map(col => {

                        if (row.id === 18 && this.state.rows[row.id + 1].col[col.id].is) {
                            cols.push({...col, is: true})
                            return
                        }

                        cols.push(col.is)
                    })
                    
                    return newRow
                }
                newRow = {...row, col: row.col.map(col => {
                    cols.push(col.is)
                    return col
                })}
                return newRow
            })})
        }, 500)})
    }
    clicker (rowId, colId) {
        this.setState({
            rows: this.state.rows.map(row => {
                if (row.id !== rowId) return row
                return {...row, col:row.col.map(col => {
                    if (col.id !== colId) return col
                    col = {...col, is: !col.is}
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