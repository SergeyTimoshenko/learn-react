import React from 'react'


class Snake extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: this.renderArea(),
            interval: null,
            snake: {
                coords: [{x:5,y:10},{x:6,y:10},{x:7,y:10},{x:7,y:11}, {x:7,y:12}]
            },
            way: 'left',
            apple: {x:3, y:3},
            width: 10,
            height: 19,
            score: 0,
            isBonus: false,
            best: localStorage.getItem('score')
        }
        this.renderSnake(true)
        this.renderApple(true)
        
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
    renderArea() {
        const area = []
        const height = this.state ? this.state.height : 19
        const width = this.state ? this.state.width : 10

        for(let i = 0; i <= height; i++) {
            area.push([])
            for (let a = 0; a <= width; a++) {
                area[i].push(0)
            }
        }
        return area
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
            this.randomApple(is)
        } else {
            let area = this.state.area
            if (this.state.isBonus) {
                area[apple.y][apple.x] = 3
            } else {
                area[apple.y][apple.x] = 2
            }
            
            if (is) return
            this.setState({area})
        }
    }
    randomApple() {
        const getInt = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min; 
        this.setState({apple: {x: getInt(0, this.state.width), y: getInt(0, this.state.height)}})
        
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
            this.scoreUpdater()
            
            this.randomApple()
            
            return true
        }
        return false
    }
    snakeAge(last) {
        this.setState({snake: {...this.state.snake, coords: [...this.state.snake.coords, last]}})
    }
    checkSelf(nextPos) {
        this.scoreSaver()
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
        
        if (this.state.snake.coords[0].x === this.state.area[0].length - 1) {
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
        if (this.state.snake.coords[0].y === this.state.area.length - 1) {
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
    scoreUpdater() {
        const isBonus = this.state.score / 10 % 1 === 0
        let score = this.state.score + 1
        if (this.state.isBonus) {
            score += 2
        }
        this.setState({score, isBonus})
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
    restart() {
        this.stop()
        this.setState({
            area: this.renderArea(),
            interval: null,
            snake: {...this.state.snake,
                coords: [{x:5,y:10},{x:6,y:10},{x:7,y:10},{x:7,y:11}, {x:7,y:12}]
            },
            way: 'left',
            apple: {x:3, y:3}
        })

        setTimeout(() => {
            this.renderSnake()
            this.renderApple()
        })
    }
    scoreSaver() {
        if (localStorage.getItem('score') < this.state.score) {
            localStorage.setItem('score', this.state.score)
        }
        this.setState({best:localStorage.getItem('score')})
    }
    onWidthChange(e) {
        this.setState({width: e.target.value})
    }
    onHeightChange(e) {
        this.setState({height: e.target.value})
    }
    color(col) {
        
        if (col === 1) {
            return 'black'
        }
        if (col === 3) {
            return 'red'
        }
        if (col === 2) {
            return 'green'
        }
        return '#fff'
    }
    componentWillUnmount() {
        this.stop()
    }
    render(){
        return (
            <div> <div style={{
                width: this.state.area[0].length * 22 +1,
                height: this.state.area.length * 22 +1,
                border: '1px solid black',
                margin: '0 auto'
            }}>
                {this.state.area.map((row, rowId) => (
                    <div key={rowId} style={{
                        width: '100%',
                        height: 20,
                        border: '1px solid transparent',
                        display: 'flex'
                    }}>
                        {row.map((col, colId) => (
                            <div key={colId} style={{
                                height: 20,
                                width: 20,
                                border: '1px solid transparent',
                                backgroundColor: this.color(col)
                            }}
                           
                            onClick={() => this.clicker(rowId, colId)}
                            ></div>
                        ))}
                    </div>
                    
                ))}
            </div>
                <button onClick={() => this.start() }>start</button>
                <button onClick={() => this.stop() }>stop</button>
                <button onClick={() => this.restart() }>restart</button>
                <div>
                    Length: {this.state.snake.coords.length}
                </div>
                <div>
                    Score: {this.state.score}
                </div>
                <div>
                    Best: {this.state.best}
                </div>
                <div>
                    <label htmlFor="width">Width</label>
                    <input id="width" type="range" min="10" max="100" value={this.state.width} onChange={(e) => this.onWidthChange(e)}/>
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <input id="height" type="range" min="10" max="100" value={this.state.height} onChange={(e) => this.onHeightChange(e)}/>
                </div>
            </div>
        )
    }
}

export default Snake