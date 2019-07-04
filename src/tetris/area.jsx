import React from 'react';

class Area extends React.Component {
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
            areaFigures: [],
            figures: [
                {
                    type: 'block',
                    orientation: 'down',
                    coords: [
                        {x:4, y:0},
                        {x:5, y:0},
                        {x:4, y:1},
                        {x:5, y:1}
                    ]
                },
                {
                    type: 'T',
                    orientation: 'down',
                    coords: [
                        {x:4, y:0},
                        {x:5, y:0},
                        {x:6, y:0},
                        {x:5, y:1}
                    ]
                },
                {
                    type: 'zic',
                    orientation: 'up-down',
                    coords: [
                        {x:4, y:0},
                        {x:4, y:1},
                        {x:5, y:1},
                        {x:5, y:2}
                    ]
                },
                {
                    type: 'wood',
                    orientation: 'up-down',
                    coords: [
                        {x:3, y:0},
                        {x:4, y:0},
                        {x:5, y:0},
                        {x:6, y:0},
                    ]
                },
                {
                    type: 'G',
                    orientation: 'down',
                    coords: [
                        {x:3, y:0},
                        {x:4, y:0},
                        {x:5, y:0},
                        {x:5, y:1}
                    ]
                }
            ],
            activeFigure: {
                type: 'block',
                orientation: 'down',
                coords: [
                    {x:4, y:0},
                    {x:5, y:0},
                    {x:4, y:1},
                    {x:5, y:1}
                ]
            },
            interval: null
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', (e) => {
            switch (e.keyCode) {
                case 97:
                    this.moveLeft()
                    break
                case 100:
                    this.moveRight()
                    break
                case 32:
                    this.rotateFigure()
                    break
                default:
                    console.log('not a key', e.keyCode)
            }
        })
    }
    moveLeft() {
        if (this.state.activeFigure.coords.filter(coord => coord.x === 0).length) return

        const figures = this.state.areaFigures
        const activeFigure = this.state.activeFigure.coords
        const figuresCoords = []
        figures.map(figure => figure.coords.map(coord => figuresCoords.push(coord)))
        let cannot = figuresCoords.filter(coord => activeFigure.filter(c => coord.x === c.x - 1 && coord.y === c.y).length).length
        
        if (cannot) return
        
        const coords = this.state.activeFigure.coords.map(coord => {
            return {...coord, x: coord.x - 1}
        })
        this.setState({activeFigure: {...this.state.activeFigure, coords}})
        this.clearArea()
        this.renderFigure()
    }
    moveRight() {
        if (this.state.activeFigure.coords.filter(coord => coord.x === 9).length) return

        const figures = this.state.areaFigures
        const activeFigure = this.state.activeFigure.coords
        const figuresCoords = []
        figures.map(figure => figure.coords.map(coord => figuresCoords.push(coord)))
        let cannot = figuresCoords.filter(coord => activeFigure.filter(c => coord.x === c.x + 1 && coord.y === c.y).length).length
        
        if (cannot) return

        const coords = this.state.activeFigure.coords.map(coord => {
            return {...coord, x: coord.x + 1}
        })
        this.setState({activeFigure: {...this.state.activeFigure, coords}})
        this.clearArea()
        this.renderFigure()
    }
    rotateFigure() {
        let figure = this.state.activeFigure
        let oldFigure = {
            coords: [],
            orientation: this.state.activeFigure.orientation
        }
        this.state.activeFigure.coords.map(c => oldFigure.coords.push(c))
        switch(figure.type) {
            case 'T':
                switch(figure.orientation) {
                    case 'down':
                        figure.coords[2] = {x:figure.coords[2].x-1, y:figure.coords[2].y-1}
                        figure.orientation = 'left'
                        break;
                    case 'left':
                        figure.coords[3] = {x:figure.coords[3].x, y:figure.coords[3].y-2}
                        figure.coords[2] = {x:figure.coords[2].x+1, y:figure.coords[2].y+1}
                        figure.orientation = 'up'
                        break;
                    case 'up':
                        figure.coords[0] = {x:figure.coords[0].x+1, y:figure.coords[0].y+1}
                        figure.orientation = 'right'
                        break;
                    case 'right':
                        figure.coords[0] = {x:figure.coords[0].x-1, y:figure.coords[0].y-1}
                        figure.coords[3] = {x:figure.coords[3].x, y:figure.coords[3].y+2}
                        figure.orientation = 'down'
                        break;
                }
                break
            case 'zic':
                switch(figure.orientation) {
                    case 'up-down':
                        figure.coords[2] = {x:figure.coords[2].x-2, y:figure.coords[2].y}
                        figure.coords[3] = {x:figure.coords[3].x, y:figure.coords[3].y-2}
                        figure.orientation = 'left-fight'
                        break;
                    case 'left-fight':
                        figure.coords[2] = {x:figure.coords[2].x+2, y:figure.coords[2].y}
                        figure.coords[3] = {x:figure.coords[3].x, y:figure.coords[3].y+2}
                        figure.orientation = 'up-down'
                        break;
                }
                break
            case 'wood':
                switch(figure.orientation) {
                    case 'up-down':
                        figure.coords[3] = {x:figure.coords[3].x-1, y:figure.coords[3].y-1}
                        figure.coords[0] = {x:figure.coords[0].x+2, y:figure.coords[0].y+2}
                        figure.coords[1] = {x:figure.coords[1].x+1, y:figure.coords[1].y+1}
                        figure.orientation = 'left-right'
                        break;
                    case 'left-right':
                        figure.coords[3] = {x:figure.coords[3].x+1, y:figure.coords[3].y+1}
                        figure.coords[0] = {x:figure.coords[0].x-2, y:figure.coords[0].y-2}
                        figure.coords[1] = {x:figure.coords[1].x-1, y:figure.coords[1].y-1}
                        figure.orientation = 'up-down'
                        break;
                }
                break
            case 'G':
                switch(figure.orientation){
                    case 'down':
                        figure.coords[0] = {x:figure.coords[0].x+1, y:figure.coords[0].y+1}
                        figure.coords[1] = {x:figure.coords[1].x+1, y:figure.coords[1].y-1}
                        figure.orientation = 'left'
                        break
                    case 'left':
                        figure.coords[0] = {x:figure.coords[0].x-1, y:figure.coords[0].y-1}
                        figure.coords[1] = {x:figure.coords[1].x-1, y:figure.coords[1].y+1}
                        figure.coords[3] = {x:figure.coords[3].x-2, y:figure.coords[3].y-2}
                        figure.orientation = 'up'
                        break;
                    case 'up':
                        figure.coords[2] = {x:figure.coords[2].x-2, y:figure.coords[2].y+1}
                        figure.coords[1] = {x:figure.coords[1].x, y:figure.coords[1].y-1}
                        figure.orientation = 'right'
                        break;
                    case 'right':
                        figure.coords[2] = {x:figure.coords[2].x+2, y:figure.coords[2].y-1}
                        figure.coords[1] = {x:figure.coords[1].x, y:figure.coords[1].y+1}
                        figure.coords[3] = {x:figure.coords[3].x+2, y:figure.coords[3].y+2}
                        figure.orientation = 'down'
                        break

                }
                break
        }
        if (figure.coords.filter(coord => this.state.areaFigures.filter(fig => fig.coords.filter(c => c.x === coord.x && c.y === coord.y).length).length).length) {
            this.setState({activeFigure: oldFigure})
            this.clearArea()
            this.renderFigure()
            return
        }
        if(figure.coords.filter(co => co.x > 9 || co.y > 19 || co.x < 0 || co.y < 0).length) {
            this.setState({activeFigure: oldFigure})
            this.clearArea()
            this.renderFigure()
            return
        }
        this.setState({activeFigure: figure})
        this.clearArea()
        this.renderFigure()

    }
    start() {
        if (!this.state.interval) 
        this.setState({interval: setInterval(() => {
            this.tick()
        }, 500)})
    }
    stop() {
        clearInterval(this.state.interval)
        this.setState({interval: null})
    }
    tick() {
        if (this.state.activeFigure) {
            this.downActiveFigure()
        }
        this.clearArea()
        this.renderFigure()
        this.removeLine()
        
    }
    clearArea() {
        this.setState({area: this.state.area.map(r => r.map(c => 0))})
    }
    setFigure() {
        this.setState({activeFigure:this.state.figures[4]})
    }
    renderFigure() {
        let area = this.state.area
        
        const {coords} = this.state.activeFigure

        coords.map(coord => {
            area[coord.y][coord.x] = 1
        })

        const fixedFigures = this.state.areaFigures

        fixedFigures.map(({ coords }) => {
            coords.map(coord => {
                area[coord.y][coord.x] = 1
            })
        })

        this.setState({area})
    }
    checkSpace() {
        const figures = this.state.areaFigures
        const activeFigure = this.state.activeFigure.coords
        const figuresCoords = []
        figures.map(figure => figure.coords.map(coord => figuresCoords.push(coord)))
        return figuresCoords.filter(coord => activeFigure.filter(c => coord.x === c.x && coord.y === c.y + 1).length).length
    }
    downActiveFigure() {
        let {coords} = this.state.activeFigure
        if (this.checkSpace() || coords.filter(c => c.y === 19).length) {
            this.fixfigure()
            return
        }
        
        const figure = coords.map(coord => {
            return {...coord, y: coord.y + 1}
        })

        this.setState({activeFigure: {...this.state.activeFigure, coords: figure}})
    }
    fixfigure() {
        const getInt = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min; 
        this.setState({
            areaFigures: [...this.state.areaFigures, this.state.activeFigure],
            activeFigure: this.state.figures[getInt(0, this.state.figures.length)]
        })
    }
    downFigures(lines) {
        if (!lines.length) return
        lines = lines.sort()
        
        let figuresCoords = []
        
        this.state.areaFigures.map(figure => figure.coords.map(coord => figuresCoords.push(coord)))
        let hairPoint = 19;

        let newCoords = [figuresCoords]

        lines.map(line => {
            newCoords.push([])
            newCoords[newCoords.length -2].map(coord => {
                if (coord.y < line) {
                    newCoords[newCoords.length -1].push({...coord, y:coord.y+1})
                    return
                }
                newCoords[newCoords.length -1].push(coord)
            }) 
        })
        
        this.setState({areaFigures: [{coords:newCoords[newCoords.length -1]}]})
    }
    removeLine() {
        let figuresCoords = []
        this.state.areaFigures.map(figure => figure.coords.map(coord => figuresCoords.push(coord)))
        let lines = []
        figuresCoords = figuresCoords.map(coord => {
            if (figuresCoords.filter(co => coord.y === co.y).length === 10) {
                if (coord.x === 0) {
                    lines.push(coord.y)

                }
                return false
            }
            return coord
        }).filter(c => c)

        
        
        this.setState({areaFigures: [{coords:figuresCoords}]})

        this.downFigures(lines)

        this.clearArea()
        this.renderFigure()
    }
    clicker (rowId, colId) {
        this.setState({
            area: this.state.area.map((row, rId) => {
                return row.map((col, cId) => {
                    if (rowId === rId && colId === cId) {
                        return 1
                    }
                    return col
                })
            })
        })
    }
    componentWillUnmount() {
        this.stop()
    }
    render() {
        return (
            <div>
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
                                backgroundColor: col ? 'black' : '#fff'
                            }}
                            onClick={() => this.clicker(rowId, colId)}
                            ></div>
                        ))}
                    </div>
                    
                ))}
                <button onClick={() => this.start()}>start</button>
                <button onClick={() => this.stop()}>stop</button>
                {/* <button onClick={() => this.setFigure()}>SetFigure</button> */}
            </div>
        )
    }
}
export default Area;