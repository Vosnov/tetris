import './style.scss'
import Game from './Game'

const canvas: HTMLCanvasElement = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const game = new Game()

for (let i = 0; i < 30; i++) {
  game.moveTetroDown()
}

console.log(game)


