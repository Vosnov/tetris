interface Tetro {
  x: number
  y: number
  blocks: number[][]
}

class Game {
  playfield: number[][]
  activeTetro: Tetro
  nextTetro: Tetro

  constructor(rows = 20, cols = 10) {
    this.activeTetro = this.createTetro()
    this.nextTetro = this.createTetro()
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

   if (this.isTetroOutOfBounce() || this.hasCllision()) {
      this.activeTetro.blocks = blocks
   }
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

  createTetro(type: null | 1 | 2 | 3 | 4 | 5 | 6 | 7 = null) {
    const TetroList = [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ]
    ]

    const randomTetroIndex = Math.floor(Math.random() * TetroList.length)

    const tetro = {
      x: 3,
      y: 0,
      blocks: []
    }

    switch (type) {
      case 1:
        tetro.blocks = TetroList[0]
        break
      case 2: 
        tetro.blocks = TetroList[1]
        break
      case 3: 
        tetro.blocks = TetroList[2]
        break
      case 4: 
        tetro.blocks = TetroList[3]
        break
      case 5: 
        tetro.blocks = TetroList[4]
        break
      case 6: 
        tetro.blocks = TetroList[5]
        break
      case 7: 
        tetro.blocks = TetroList[6]
        break
      default:
        tetro.blocks = TetroList[randomTetroIndex]
        break
    }

    return tetro
  }

  clearLines() {
    for (let col = this.playfield.length - 1; col >= 0; col--) {
      if (!this.playfield[col].includes(0)) {
        this.playfield.splice(col, 1)
        this.playfield.unshift(new Array(col).fill(0))
      }
    }
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

    this.clearLines()

    this.activeTetro = this.nextTetro
    this.nextTetro = this.createTetro()
  }
}

export default Game