import './style.scss'
import Game from './Game'
import View from './View'
import InfoPanel from './InfoPanel'

const node = document.querySelector('.canvas-wrapper')

const view = new View(node)
const infoPanel = new InfoPanel(node)
const game = new Game()

view.renderStartScreen()
view.renderEndScreen(20)

document.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 37:
      game.moveTetroLeft()
      render()
      break
    case 38:
      game.rotateTetro()
      render()
      break
    case 39:
      game.moveTetroRight()
      render()
      break
    case 40:
      game.moveTetroDown()
      render()
      break
  }
})

function render() {
  const nextTetro = game.nextTetro.blocks
  const {
    score,
    lines,
    level
  } = game

  view.render(game.getMap())
  infoPanel.render(nextTetro, score, lines, level)
}

console.log(game.playfield)

