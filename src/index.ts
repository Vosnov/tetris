import './style.scss'
import Game from './Game'
import View from './View'

const node = document.querySelector('.canvas-wrapper')

const view = new View(node, 20, 10, 30)
const game = new Game()

// for (let i = 0; i < 30; i++) {
//   game.moveTetroDown()
// }

game.rotateTetro()

document.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 37:
      game.moveTetroLeft()
      view.render(game.getMap())
      break
    case 38:
      game.rotateTetro()
      view.render(game.getMap())
      break
    case 39:
      game.moveTetroRight()
      view.render(game.getMap())
      break
    case 40:
      game.moveTetroDown()
      view.render(game.getMap())
      break
  }
})

view.render(game.getMap())

console.log(game)


