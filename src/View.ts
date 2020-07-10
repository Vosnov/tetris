export default class View {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  cols: number
  rows: number
  step: number

  constructor(node: Element, cols = 10, rows = 20, step = 30) {
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

  render(map: number[][]) {
    const ctx = this.ctx
    const canvas = this.canvas

    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)

    for(let col = 0; col < map.length; col++) {
      for(let row = 0; row < map[0].length; row++) {
        if (map[col][row] === 1) {
          const x = row * this.step
          const y = col * this.step

          ctx.beginPath()
          ctx.fillStyle = 'white'
          ctx.fillRect(x, y, this.step, this.step)
        }
      }
    }
  }
}