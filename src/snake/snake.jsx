import React from 'react'

class Snake extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
            ],
            interval: null,
            snake: {
                coords: [{x:5,y:10},{x:6,y:10},{x:7,y:10},{x:7,y:11}, {x:7,y:12}]
            },
            way: 'left',
            apple: {x:3, y:3}
        }
        this.renderSnake(true)
        this.renderApple(true)
        console.log(this.state.area)
    }
    componentDidMount() {
        document.addEventListener('keypress', (e) => {
            switch (e.keyCode) {
                case 97:
                    this.setState({way: 'left'})
                    break
                case 100:
                    this.setState({way: 'right'})
                    break
                case 119:
                    this.setState({way: 'top'})
                    break;
                case 115:
                    this.setState({way: 'bottom'})
                    break;
                default:
                    console.log('not a key', e.keyCode)
            }
        })
    }
    renderSnake(is = false) {
        let area = this.state.area;
        const {coords} = this.state.snake
        coords.map(c => {
            area[c.y][c.x] = 1
        })
        if (is) return
        this.setState({area})
    }
    renderApple(is = false) {
        const apple = this.state.apple

        if (this.state.snake.coords.filter(coord => coord.x === apple.x && coord.y === apple.y).length) {
            this.randomApple()
        } else {
            let area = this.state.area
            area[apple.y][apple.x] = 2
            if (is) return
            this.setState({area})
        }
    }
    randomApple() {
        const getInt = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min; 
        this.setState({apple: {x: getInt(0, 9), y: getInt(0, 19)}})

        this.renderApple()
    }
    start() {
        if (this.state.interval) return 
        this.setState({interval: setInterval(() => {
            this.tick()
        }, 200)})
    }
    stop() {
        clearInterval(this.state.interval)
        this.setState({interval:null})
    }
    clearArea() {
        this.setState({area: this.state.area.map(r => r.map(c => 0))})
    }
    checkApple() {
        const apple = this.state.apple
        const head = this.state.snake.coords[0]

        if (apple.x === head.x && apple.y === head.y) {
            this.randomApple()
            return true
        }
        return false
    }
    snakeAge(last) {
        this.setState({snake: {...this.state.snake, coords: [...this.state.snake.coords, last]}})
    }
    checkSelf(nextPos) {
        return this.state.snake.coords.filter(coord => coord.x === nextPos.x && coord.y === nextPos.y).length > 0
    }
    moveleft() {
        if (this.state.snake.coords[0].x === 0) {
            this.stop()
            return
        }
        const snakeLength = this.state.snake.coords.length
        const snakeHead = this.state.snake.coords[0]
        const snakeBodyLength = this.state.snake.coords.filter(coord => coord.y === snakeHead.y).length
        let coords = this.state.snake.coords
        if (this.checkSelf({...snakeHead, x: snakeHead.x - 1})) {
            this.stop()
            return
        }
        if (snakeBodyLength === snakeLength) {
            coords = coords.map(coord => { return {...coord, x: coord.x - 1}})
        } else {
            coords = coords.map((coord, key) => {
                if (key === 0) {
                    return {...coord, x:coord.x - 1}
                } else {
                    return coords[key - 1]
                }
            })
        }
        
        this.setState({snake: {...this.state.snake, coords}})
    }
    moveright() {
        if (this.state.snake.coords[0].x === 9) {
            this.stop()
            return
        }
        
        const snakeLength = this.state.snake.coords.length
        const snakeHead = this.state.snake.coords[0]
        const snakeBodyLength = this.state.snake.coords.filter(coord => coord.y === snakeHead.y).length
        let coords = this.state.snake.coords
        if (this.checkSelf({...snakeHead, x: snakeHead.x + 1})) {
            this.stop()
            return
        }
        if (snakeBodyLength === snakeLength) {
            coords = coords.map(coord => { return {...coord, x: coord.x + 1}})
        } else {
            coords = coords.map((coord, key) => {
                if (key === 0) {
                    return {...coord, x:coord.x + 1}
                } else {
                    return coords[key - 1]
                }
            })
        }
        this.setState({snake: {...this.state.snake, coords}})
    }
    movetop() {
        if (this.state.snake.coords[0].y === 0) {
            this.stop()
            return
        }

        const snakeLength = this.state.snake.coords.length
        const snakeHead = this.state.snake.coords[0]
        const snakeBodyLength = this.state.snake.coords.filter(coord => coord.x === snakeHead.x).length
        let coords = this.state.snake.coords
        if (this.checkSelf({...snakeHead, y: snakeHead.y - 1})) {
            this.stop()
            return
        }
        if (snakeBodyLength === snakeLength) {
            coords = coords.map(coord => { return {...coord, y: coord.y -1} })
        } else {
            coords = coords.map((coord, key) => {
                if (key === 0) {
                    return {...coord, y:coord.y - 1}
                } else {
                    return coords[key - 1]
                }
            })
        }
        this.setState({snake: {...this.state.snake, coords}})
    }
    movebottom() {
        if (this.state.snake.coords[0].y === 19) {
            this.stop()
            return
        }
        const snakeLength = this.state.snake.coords.length
        const snakeHead = this.state.snake.coords[0]
        const snakeBodyLength = this.state.snake.coords.filter(coord => coord.x === snakeHead.x).length
        let coords = this.state.snake.coords
        if (this.checkSelf({...snakeHead, y: snakeHead.y + 1})) {
            this.stop()
            return
        }
        if (snakeBodyLength === snakeLength) {
            coords = coords.map(coord => { return {...coord, y: coord.y + 1} })
        } else {
            coords = coords.map((coord, key) => {
                if (key === 0) {
                    return {...coord, y:coord.y + 1}
                } else {
                    return coords[key - 1]
                }
            })
        }
        
        this.setState({snake: {...this.state.snake, coords}})
    }
    tick() {

        const lastDot = this.state.snake.coords[this.state.snake.coords.length -1]

        this.clearArea()
        if (this.state.way === 'left') {
            this.moveleft()
        }
        if (this.state.way === 'right') {
            this.moveright()
        }
        if (this.state.way === 'top') {
            this.movetop()
        }
        if (this.state.way === 'bottom') {
            this.movebottom()
        }
        
        this.renderSnake()
        if (this.checkApple()) {
            this.snakeAge(lastDot)
            this.renderSnake()
        }
        this.renderApple()
    }
    clicker(rowId, colId) {
        this.setState({
            area: this.state.area.map((row, areaRowId) => {
                return row.map((col, areaColId) => {
                    if (areaColId === colId && areaRowId === rowId) {
                        return col ? 0 : 1
                    }
                    return col
                })
            })
        })
    }
    render(){
        return (
            <div> <div style={{
                width: 221,
                height: 441,
                border: '1px solid black',
                margin: '0 auto'
            }}>
                {this.state.area.map((row, rowId) => (
                    <div key={rowId} style={{
                        width: '100%',
                        height: 20,
                        border: '1px solid black',
                        display: 'flex'
                    }}>
                        {row.map((col, colId) => (
                            <div key={colId} style={{
                                height: 20,
                                width: 20,
                                border: '1px solid black',
                                backgroundColor: col === 1 ? 'black' : col === 2 ? 'green' : '#fff'
                            }}
                            onClick={() => this.clicker(rowId, colId)}
                            ></div>
                        ))}
                    </div>
                    
                ))}
            </div>
                <button onClick={()=>this.start()}>start</button>
                <button onClick={() => this.stop()}>stop</button>
            </div>
        )
    }
}

export default Snake