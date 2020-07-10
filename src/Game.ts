interface ActiveTetro {
  x: number
  y: number
  blocks: number[][]
}

class Game {
  playfield: number[][]
  activeTetro: ActiveTetro

  constructor(rows = 20, cols = 10) {
    this.activeTetro = {
      x: 0,
      y: 0,
      blocks: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ]
    }

    this.playfield = this.createGrid(rows, cols)
  }

  moveTetroDown() {
    this.activeTetro.y += 1

    if (this.isTetroOutOfBounce()) {
      this.activeTetro.y -= 1
      this.lockTetro()
    }
  }

  moveTetroRight() {
    this.activeTetro.x += 1

    if (this.isTetroOutOfBounce()) {
      this.activeTetro.x -= 1
    }
  }

  moveTetroLeft() {
    this.activeTetro.x -= 1

    if (this.isTetroOutOfBounce()) {
      this.activeTetro.x += 1
    }
  }

  rotateTetro() {
    const blocks = this.activeTetro.blocks
    const length = blocks.length

    const temp = this.createGrid(length, length)

    for (let col = 0; length; col++) {
      for (let row = 0; row < length; row++) {
        temp[row][col] = blocks[length - 1 - col][row]
      }
    }

    this.activeTetro.blocks = temp
  }

  // hasCllision(direction: 'left' | 'right' | 'down') {

  // }

  isTetroOutOfBounce() {
    const {x, y, blocks} = this.activeTetro
    const playfield = this.playfield

    for (let col = 0; col < blocks.length; col++) {
      for (let row = 0; row < blocks[col].length; row++) {

        if (blocks[col][row] !== 0) {
          if (playfield[col + y] === undefined || playfield[col + y][row + x] === undefined) {
            return true
          }
        }

      }
    }

    return false
  }

  createGrid(rows: number, cols: number) {
    return new Array(rows).fill(null)
      .map(() => new Array(cols).fill(null)
        .map(() => 0))
  }

  lockTetro() {
    const {x, y, blocks} = this.activeTetro

    for (let col = 0; col < blocks.length; col++) {
      for (let row = 0; row < blocks[col].length; row++) {
        if (blocks[col][row]) {
          this.playfield[col + y][row + x] = blocks[col][row]
        }
      }
    }
  }
}

export default Game