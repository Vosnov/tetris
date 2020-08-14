import { EColors } from "./Game"

export default class View {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  cols: number
  rows: number
  step: number

  constructor(node: Element, rows = 10, cols = 20, step = 30) {
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'canvas'
    this.ctx = this.canvas.getContext('2d')

    this.cols = cols
    this.rows = rows
    this.step = step

    this.canvas.width  = rows * step
    this.canvas.height = cols * step

    node.appendChild(this.canvas)
  }

  renderStartScreen() {
    const ctx = this.ctx
    const fontSize = 20
    const canvas = this.canvas

    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.font = `${fontSize}px Arial`

    ctx.fillText(`Press Enter to Start`, canvas.width / 2, canvas.height / 2)
  }

  renderEndScreen(score: number) {
    const ctx = this.ctx
    const canvas = this.canvas

    const fontSize = 20
    const margin = 30 

    const x = canvas.width / 2
    const y = canvas.height / 2

    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.font = `${fontSize}px Arial`

    ctx.fillText(`GAME OVER`, x, y - margin)
    ctx.fillText(`Your Score: ${score}`, x, y)
    ctx.fillText(`Press Enter to Restart`, x, y + margin)
  }

  render(map: number[][]) {
    const ctx = this.ctx
    const canvas = this.canvas

    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)

    for(let col = 0; col < map.length; col++) {
      for(let row = 0; row < map[0].length; row++) {
        if (map[col][row] !== 0) {
          const x = row * this.step
          const y = col * this.step

          ctx.beginPath()
          ctx.fillStyle = EColors[map[col][row]]
          ctx.fillRect(x + 1, y + 1, this.step - 2, this.step - 2)
        }
      }
    }
  }
}
