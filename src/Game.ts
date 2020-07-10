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

  getMap() {
    const playfield = this.playfield.map(elem => elem.slice())
    const activeTetro = this.activeTetro
      
    for (let col = 0; col < activeTetro.blocks.length; col++) {
      for (let row = 0; row < activeTetro.blocks[0].length; row++) {
        if (activeTetro.blocks[col][row] === 1) {
          const y = activeTetro.y + col
          const x = activeTetro.x + row

          playfield[y][x] = activeTetro.blocks[col][row]
        }
      }
    }

    return playfield
  }

  moveTetroDown() {
    this.activeTetro.y += 1

    if (this.isTetroOutOfBounce() || this.hasCllision()) {
      this.activeTetro.y -= 1
      this.lockTetro()
    }
  }

  moveTetroRight() {
    this.activeTetro.x += 1

    if (this.isTetroOutOfBounce() || this.hasCllision()) {
      this.activeTetro.x -= 1
    }
  }

  moveTetroLeft() {
    this.activeTetro.x -= 1

    if (this.isTetroOutOfBounce() || this.hasCllision()) {
      this.activeTetro.x += 1
    }
  }

  rotateTetro() {
    const blocks = this.activeTetro.blocks
    const length = blocks.length

    const temp = this.createGrid(length, length)

    for (let col = 0; col < length; col++) {
      for (let row = 0; row < length; row++) {
        temp[row][col] = blocks[length - 1 - col][row]
      }
    }

    this.activeTetro.blocks = temp
  }

  // Коллизя
  hasCllision() {
    const {x, y, blocks} = this.activeTetro

    for (let col = 0; col < blocks.length; col++) {
      for (let row = 0; row < blocks[col].length; row++) {
        if (blocks[col][row] !== 0) {
          if(this.playfield[col + y][row + x]) return true
        }
      }
    }

    return false
  }

  // Выход за пределы карты
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

  // Фиксация Tetro
  lockTetro() {
    const {x, y, blocks} = this.activeTetro

    for (let col = 0; col < blocks.length; col++) {
      for (let row = 0; row < blocks[col].length; row++) {
        if (blocks[col][row]) {
          this.playfield[col + y][row + x] = blocks[col][row]
        }
      }
    }
    this.activeTetro =  {
      x: 0,
      y: 0,
      blocks: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ]
    }
  }
}

export default Game