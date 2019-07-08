import React from 'react'
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import Konva from 'konva'

let moving = null
let tickInterval = null

export default class Arcanoid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'green',
            area: {
                width: 300,
                height: 300
            },
            plant: {
                x:125, y:280, width: 50, height: 10
            },
            ball: {
                x:150, y:270
            },
            ballVec: {
                vertical: 'up',
                horizontal: 'right'
            },
            gameOver: false,
            figures: [
                {
                    x: 10,
                    y: 10,
                },
                {
                    x: 70,
                    y: 10
                },
                {
                    x: 130,
                    y: 10
                },
                {
                    x: 190,
                    y: 10
                },
                {
                    x: 250,
                    y: 10
                }
            ],
            figureHeight: 10,
            figureWidth: 40,
            ballRadius: 10
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', ({keyCode}) => {
            switch (keyCode) {
                case 37:
                    this.plantLeft()
                    break
                case 39:
                    this.plantRight()
                    break
                default:
                    console.log('not a key', keyCode)
            }
        })
        document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 37:
                    this.stopMoving()
                    break
                case 39:
                    this.stopMoving()
                    break
                default:
                    console.log('not a key', e.keyCode)
            }
        })

    }
    plantLeft() {
        if (moving) return
        moving = setInterval(() => {
            if (this.state.plant.x === 0) return
            this.setState({plant: {...this.state.plant, x: this.state.plant.x - 1}})
        }, 5)
    }
    stopMoving() {
        clearInterval(moving)
        moving = null
    }
    plantRight() {
        if (moving) return
        moving = setInterval(() => {
            if (this.state.plant.x === 250) return
            this.setState({plant: {...this.state.plant, x: this.state.plant.x + 1}})
        }, 5)
        
    }
    updateCanvas() {
        const ctx = this.refs.canvas.msGetRegionContent('2d')

        ctx.fillRect(0,0,100,100)
    }
    handleClick = () => {
        this.setState({
            color: Konva.Util.getRandomColor()
        })
    }
    tick(){
        this.dragBall()
        this.checkFigureExists()
    }
    dragBall() {
        let ball = {...this.state.ball};
        let ballVec = {...this.state.ballVec}

        if (ballVec.vertical === 'up') {
            if (this.checkFigure(ball) || ball.y === 5) {
                ballVec = {...ballVec, vertical: 'down'}
                ball = {...ball, y: ball.y +1}
            } else {
                ball = {...ball, y: ball.y -1}
            }
        } else {
            if (this.checkPlant(ball)) {
                ballVec = {...ballVec, vertical: 'up'}
                ball = {...ball, y: ball.y -1}
            } else {
                if (ball.y === 310) {
                    this.stop()
                    this.gameOver()
                }
                ball = {...ball, y: ball.y +1}
            }
        }
        if (ballVec.horizontal === 'right') {
            if (ball.x === 295) {
                ballVec = {...ballVec, horizontal: 'left'}
                ball = {...ball, x: ball.x - 1}
            } else {
                ball = {...ball, x: ball.x + 1}
            }
        } else {
            if (ball.x === 5) {
                ballVec = {...ballVec, horizontal: 'right'}
                ball = {...ball, x: ball.x + 1}
            } else {
                ball = {...ball, x: ball.x - 1}
            }
        }
        this.setState({ball, ballVec})
    }
    checkFigure(ball) {
        const figureHeight = this.state.figureHeight;
        const figureWidth = this.state.figureWidth;
        const ballRadius = this.state.ballRadius;
        const figures = [...this.state.figures];
        const ballTopDot = ball.y - ballRadius;
       
        const currentFigure = figures.filter(figure => {
            const figureBottomDot = figure.y + figureHeight;
            const figureRightDot = figure.x + figureWidth;
            if (ballTopDot === figureBottomDot) {
                if (ball.x > figure.x && ball.x < figureRightDot) {
                    return true;
                }
            }
            return false
        })[0]

        if (currentFigure) {
            figures.splice(figures.indexOf(currentFigure), 1)
            this.setState({figures: figures})
            return true
        }
        
        return false
    }
    checkFigureExists() {
        if (!this.state.figures.length) {
            this.stop()
            this.setState({ball:{x:150, y:270}})
        }
    }
    checkPlant(ball) {
        const plant = {...this.state.plant}
        if (plant.x < ball.x && ball.x < plant.x + 50) {
            if (ball.y === 270) {
                return true
            }
        }
        return false
    }
    start()  {
        if (tickInterval) return
        if (this.state.gameOver) return
        tickInterval = setInterval(() => {
            this.tick()
        }, 10)
    }
    stop() {
        clearInterval(tickInterval)
        tickInterval = null
    }
    gameOver() {
        this.setState({gameOver: true})
    }
    render() {
        return (
            <div>
                <div style={{
                width: this.state.area.width + 2,
                height: this.state.area.height + 2,
                margin: '0 auto'
            }}>
                <Stage width={this.state.area.width} height={this.state.area.height} style={{border: '1px solid'}}>
                    <Layer>
                        {
                            this.state.figures.map((f, k) => (
                                <Rect
                                    key={k}
                                    x={f.x}
                                    y={f.y}
                                    width={this.state.figureWidth}
                                    height={this.state.figureHeight}
                                    fill={this.state.color}
                                    shadowBlur={5}
                                    onClick={this.handleClick}
                                />
                            ))
                        }
                        {
                            this.state.gameOver ? (<Text text="Game Over" x={120} y={150} />) : null
                        }
                        {/* PLANT */}
                        <Rect 
                            x={this.state.plant.x}
                            y={this.state.plant.y}
                            width={this.state.plant.width}
                            height={this.state.plant.height}
                            fill={this.state.color}
                            onClick={this.handleClick}
                        />
                        {/* BOL */}
                        <Circle
                            x={this.state.ball.x}
                            y={this.state.ball.y}
                            draggable
                            radius={this.state.ballRadius}
                            fill={this.state.color}
                            onDragEnd={(e) => {
                                this.handleClick();
                            }}
                        />
                    </Layer>
                </Stage>
            </div>
            <div>
                <button onClick={() => this.start()}>start</button>
                <button onClick={() => this.stop()} >stop</button>
                <button onClick={() => this.tick()}>nextTick</button>
            </div>
            </div>
        )
    }
}