import React from 'react'
import { Stage, Layer, Rect, Circle, Text, Shape } from 'react-konva';
import Konva from 'konva'

let rotationInterval = null

export default class Shooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: {
                width: 500,
                height: 500
            },
            fires: []
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', ({keyCode}) => {
            if (keyCode === 37) {
                this.rotation('left')
            }
            if (keyCode === 39) {
                this.rotation('right')
            }
            if (keyCode === 32) {
                this.fire()
            }
        })
        document.addEventListener('keyup', ({keyCode}) => {
            if (keyCode === 37 || keyCode === 39) {
                this.stopRotation()
            }
        })
        this.tick()
    }
    rotation(pattern) {
        if (rotationInterval) return
        rotationInterval = setInterval(() => {
            if (pattern === 'left') {
                this.refs.shape = this.refs.shape.rotate(-1)
            } else {
                this.refs.shape = this.refs.shape.rotate(1)
            }
            
            this.setState({test:1})
        }, 5)
    }
    stopRotation() {
        clearInterval(rotationInterval)
        rotationInterval = null
    }
    fire() {
        console.log(this.state.fire)
        this.setState({fires: [...this.state.fires, {x: 250, y: 250}]})
    }
    moveFire() {
        const fires = [...this.state.fires]
        let newFires = fires.map(fire => {
            if (fire.y < -10) return false;
            return {...fire, y: fire.y - 1}
        }).filter(r => r)
        this.setState({fires: newFires})
    }
    tick() {
        setInterval(() => {
            this.moveFire()
        }, 10)
    }
    render() {
        return (
            <div style={{margin: '0 auto', width: this.state.area.width + 2, height: this.state.area.height + 2}}>
                <Stage width={this.state.area.width} height={this.state.area.height} style={{border: '1px solid black'}}>
                    <Layer>
                    {
                        this.state.fires.map((fire, key) => (
                            <Rect
                                key={key}
                                x={fire.x}
                                y={fire.y}
                                width={2}
                                height={5}
                                fill="black"
                            />
                        ))
                    }
                    <Shape
                        ref="shape"
                        sceneFunc={(context, shape) => {
                            context.beginPath();
                            context.moveTo(0, -10);
                            context.lineTo(15, 30);
                            context.lineTo(-15, 30);
                            context.closePath();
                            context.fillStrokeShape(shape);
                        }}
                        fill="black"
                        stroke="black"
                        strokeWidth={4}
                        offset={{x:0, y:10}}
                        x={250}
                        y={250}
                    />
                    </Layer>
                </Stage>
                <button onClick={() => this.rotation()}>rotatin</button>
            </div>
        )
    }
}