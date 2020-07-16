import './style.scss'
import Game from './Game'
import View from './View'
import InfoPanel from './InfoPanel'
import Control from './Control'

const node = document.querySelector('.canvas-wrapper')

const view = new View(node)
const infoPanel = new InfoPanel(node)
const game = new Game()

const control = new Control(game, view, infoPanel)


// view.renderStartScreen()
// view.renderEndScreen(20)


console.log(game.playfield)

