export default class InfoPanel {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  step: number

  constructor(elem: Element, rows = 10, cols = 20, step = 30) {
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'info-panel'
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = 5 * step
    this.canvas.height = cols * step

    this.step = step
    elem.appendChild(this.canvas)
  }

  render(nextTetro: number [][]) {
    const fontSize = 20
    const margin = 10
    const textCords = fontSize + margin

    this.ctx.beginPath()
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.beginPath()
    this.ctx.textAlign = 'start'
    this.ctx.textBaseline = 'top'
    this.ctx.fillStyle = 'white'
    this.ctx.font = `${fontSize}px Arial`

    this.ctx.fillText(`Score`, 0, 0)
    this.ctx.fillText(`Lines`, 0, textCords)
    this.ctx.fillText(`Level`, 0, textCords * 2)
    this.ctx.fillText(`Next`, 0, textCords * 3)

    this.renderTetro(nextTetro, textCords * 4)
  }

  renderTetro(nextTetro: number[][], textCords: number) {
    for(let col = 0; col < nextTetro.length; col++) {
      for(let row = 0; row < nextTetro[0].length; row++) {
        if (nextTetro[col][row] === 1) {
          const x = row * (this.step / 2)
          const y = col * (this.step / 2)
          const size = (this.step / 2) - 2

          this.ctx.beginPath()
          this.ctx.fillStyle = 'white'
          this.ctx.fillRect(x, y + textCords, size, size)
        }
      }
    }
  }
}