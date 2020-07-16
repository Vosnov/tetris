import View from "./View"
import InfoPanel from "./InfoPanel"
import Game from './Game'

export default class Control {
  game: Game
  view: View
  infoPanel: InfoPanel
  isStart: boolean
  interval: NodeJS.Timeout

  constructor(game: Game, view: View, infoPanel: InfoPanel) {
    this.game = game
    this.view = view
    this.infoPanel = infoPanel
    this.interval = null

    this.isStart = false

    document.addEventListener('keydown', e => this.handleKeyDown(e))
    document.addEventListener('keyup', e => this.handleKeyUp(e))
    view.renderStartScreen()
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.keyCode === 40) {
      this.startTimer(1000)
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    switch(e.keyCode) {
      // Left Key
      case 37:
        this.game.moveTetroLeft()
        this.render()
        break
      // Up Key
      case 38:
        this.game.rotateTetro()
        this.render()
        break
      // Right Key
      case 39:
        this.game.moveTetroRight()
        this.render()
        break
      // Down Key
      case 40:
        clearInterval(this.interval)
        this.game.moveTetroDown()
        this.render()
        break
      // Enter Key
      case 13:
        this.gameStart()
        break
    }
  }

  startTimer(time: number) {
    this.interval = setInterval(() => {
      this.game.moveTetroDown()
      this.render()
    }, time)
  }

  gameStart() {
    this.game.restart()

    this.isStart = true
    this.render()

    this.startTimer(1000)
  }

  render() {
    const nextTetro = this.game.nextTetro.blocks
    const {
      score,
      lines,
      level
    } = this.game

    if (!this.game.gameOver) {
      this.view.render(this.game.getMap())
      this.infoPanel.render(nextTetro, score, lines, level)
    } else {
      clearInterval(this.interval)
      this.view.renderEndScreen(this.game.score)
    }
  }
}