import React from 'react'
import { Stage, Layer, Rect, Circle, Text, Shape, Image } from 'react-konva';
import Konva from 'konva'

let rotationInterval = null
let enemiesInterval = null
let planetInterval = null
let globalInterval = null

class Asteroid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
    }
    componentDidMount() {
        this.loadImage()
    }
    loadImage = () => {
        this.image = new window.Image()
        this.image.src = 'https://png.pngtree.com/element_origin_min_pic/00/00/00/0056a0b4ea2ac7a.jpg'
        this.image.width = 30
        this.image.height = 30
        this.image.addEventListener('load', this.handlerLoad)
    }
    handlerLoad = () => {
        this.setState({
            image: this.image
        })
    }

    render() {
        return (
            <Image 
                x={this.props.x -15}
                y={this.props.y -15}
                image={this.state.image}
            />
        )
    }
}

class Planet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
    }
    componentDidMount() {

    }
    loadImage = () => {
        this.image = new window.Image()
        this.image.src = 'https://images.vexels.com/media/users/3/152536/isolated/preview/401b51c3a9098f12b566121c92009877-mars-planet-icon-by-vexels.png'
        this.image.width = 50
        this.image.height = 50
        this.image.addEventListener('load', this.handler)
    }
    handler = () => {
        const image = this.image;
        this.setState({image})
    }
    render() {
        return (
            <Image 
                x={this.props.x}
                y={this.props.y}
                image={this.state.image}
            />
        )
    }
}

export default class Shooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: {
                width: 500,
                height: 500
            },
            fires: [],
            enemies: [],
            planets: [],
            kills: 0,
            deads: 0
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
        this.start()
    }
    enemiesGenerator() {
        enemiesInterval = setInterval(() => {
            switch(this.getInt(2, 4)) {
                case 2:
                    this.setState({enemies: [...this.state.enemies, {x:500, y:this.getInt(0, 500)}]})
                    break;
                case 3:
                    this.setState({enemies: [...this.state.enemies, {x:0, y:this.getInt(0, 500)}]})
                    break;
                default:
                    // console.log('NOT enemy type')
            }
            
            // console.log('new ememy', this.state.enemies)
        }, 2000)
    }
    planetGenerator() {
        planetInterval = setInterval(() => {
            this.setState({planets: [...this.state.planets, {x:0, y:0}]})
        }, 15000)
    }
    getInt = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min;
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
        this.setState({fires: [...this.state.fires, {x: 250, y: 250, k:Math.tan((90 - this.refs.shape.rotation()) * (Math.PI/180)), r: this.refs.shape.rotation()}]})
    }
    moveEnemies() {
        const enemies = [...this.state.enemies];
        if (!enemies.length) return
        this.setState({enemies: enemies.map(enemy => {
            if(enemy.x > 230 && enemy.x < 270) {
                this.setState({deads: this.state.deads + 1})
                return false
            }
            let x = enemy.x + 1
            if (enemy.x > 250) {
                x -= 2
            }
            const k = (250 - enemy.y)/(250 - enemy.x)
            let y = k * (x - 250) + 250                         
            return {y, x}
        }).filter(v => v)})
    }
    checkFireEnemy() {
        let fires = [...this.state.fires]
        let enemies = [...this.state.enemies]
        
        let firesLen = fires.length
        enemies = enemies.filter(enemy => {
            fires = fires.filter(fire => {
                let enemyLY = enemy.y - 10
                let enemyRL = enemy.y + 10
                if (enemyLY < fire.y && enemyRL > fire.y) {
                    let enemyLX = enemy.x - 10
                    let enemyRX = enemy.x + 10
                    if (enemyLX < fire.x && enemyRX > fire.x) {
                        this.setState({kills: this.state.kills + 1})
                        return false
                    }
                }
                return true
            })
            if (fires.length !== firesLen) {
                firesLen = fires.length
                return false
            }
            return true
        })
        this.setState({fires, enemies})

    }
    moveFire() {
        const fires = [...this.state.fires]
        let newFires = fires.map(fire => {
            if (fire.y < -10) return false;
            if (fire.x > 510) return false;
            if (fire.x < -10) return false;
            if (fire.y > 510) return false;
            let x = fire.x + 1
            if (fire.r > 0) {
                if (fire.r / Math.round(fire.r / 360) < 360) {
                    x -= 2
                }
            }
            if (fire.r < 0) {
                if (fire.r / Math.round(fire.r / 360) > 360) {
                    x -= 2
                }
            }
            let y = -1 * fire.k * (x - 250) +250
            return {...fire, x, y}
        }).filter(r => r)
        this.setState({fires: newFires})
    }
    movePlanet() {
        let planets = [...this.state.planets]
        if (!planets.length) return
        this.checkPlanetFire()
        planets = planets.map(planet => {
            if (planet.y < -50) return false
            let x = planet.x += 1
            let k = (250 - planet.x) / (250 + planet.y)
            let y = k * x * 2.8
            return {x, y}
        }).filter(v => v)
        this.setState({planets})
    }
    checkPlanetFire() {
        let planets = [...this.state.planets]
        let fires = [...this.state.fires]

        planets.map(planet => {
            fires.map(fire => {
                let enemyLY = planet.y - 25
                let enemyRL = planet.y + 25
                if (enemyLY < fire.y && enemyRL > fire.y) {
                    let enemyLX = planet.x - 25
                    let enemyRX = planet.x + 25
                    if (enemyLX < fire.x && enemyRX > fire.x) {
                        this.stop()
                    }
                }
                return true
            })
        })
    }
    tick() {
        globalInterval = setInterval(() => {
            this.moveFire()
            this.moveEnemies()
            this.checkFireEnemy()
            this.movePlanet()
        }, 10)
    }
    stop() {
        clearInterval(globalInterval)
        clearInterval(enemiesInterval)
        clearInterval(planetInterval)
        globalInterval = null
        enemiesInterval = null
        planetInterval = null
    }
    start() {
        if (globalInterval) return
        this.tick()
        this.enemiesGenerator()
        this.planetGenerator()
    }
    render() {
        return (
            <div style={{margin: '0 auto', width: this.state.area.width + 2, height: this.state.area.height + 2}}>
                <Stage width={this.state.area.width} height={this.state.area.height} style={{border: '1px solid black', backgroundColor:'#f6f6f6'}}>
                    <Layer>
                    {
                        this.state.planets.map((planet, key) => (
                            <Circle 
                                key={key}
                                x={planet.x}
                                y={planet.y}
                                radius={25}
                                fill="red"
                            />
                            // <Planet 
                            //     key={key}
                            //     x={planet.x}
                            //     y={planet.y}
                            // />
                        ))
                    }
                    {
                        this.state.enemies.map((enemy, key) => (
                            // <Shape
                            //     key={key}
                            //     x={enemy.x}
                            //     y={enemy.y}
                            //     radius={10}
                            //     fill="red"
                            //     stroke="red"
                            //     strokeWidth={1}
                            //     offset={{x:enemy.x, y:enemy.y}}
                            //     sceneFunc={(context, shape) => {
                            //         context.beginPath()

                            //         context.moveTo(0 + enemy.x, -10 + enemy.y)

                            //         for(let i = 0; i <= 10; i++) {
                            //             context.lineTo(0 + enemy.x + i, -10 + enemy.y + i)
                            //         }
                            //         for(let i = 0; i <= 10; i++) {
                            //             context.lineTo(10 + enemy.x - i, 0 + enemy.y + i)
                            //         }

                            //         for(let i = 0; i <= 10; i++) {
                            //             context.lineTo(0 + enemy.x - i, 10 + enemy.y - i)
                            //         }
                            //         for(let i = 0; i <= 10; i++) {
                            //             context.lineTo(-10 + enemy.x - i, 0 + enemy.y - i)
                            //         }
                            //         context.closePath()
                            //         context.fillStrokeShape(shape)
                            //     }}
                            // />
                            // <Circle 
                            //     key={key}
                            //     x={enemy.x}
                            //     y={enemy.y}
                            //     radius={10}
                            //     fill="red"
                            // />
                            <Asteroid 
                                key={key}
                                x={enemy.x}
                                y={enemy.y}
                            />
                        ))
                    }
                    {
                        this.state.fires.map((fire, key) => (
                            <Rect
                                ref={'arrow' + key}
                                key={key}
                                x={fire.x}
                                y={fire.y}
                                width={2}
                                height={5}
                                fill="black"
                                rotation={fire.r}
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
                <button onClick={() => this.stop()}>Stop</button>
                <button onClick={() => this.start()}>Start</button>
                <div>Kills: {this.state.kills}</div>
                <div>Deaths: {this.state.deads}</div>
            </div>
        )
    }
}