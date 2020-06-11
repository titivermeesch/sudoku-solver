/**
 * Check if puzzle is completed
 * @param {array of arrays} puzzle
 */
const isCompleted = (puzzle) => {
  return puzzle.reduce((acc, curr) => {
    if (!acc) {
      return acc
    }

    if (curr.some((el) => el === 0)) {
      return false
    }

    return true
  }, true)
}

const getColumn = (puzzle, columnIndex) => {
  const columns = []

  puzzle.forEach((line) => {
    columns.push(line[columnIndex])
  })

  return columns
}

const getSquare = (puzzle, lineIndex, numberIndex) => {
  const square = []
  const blocks = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]

  const block1 = blocks.find((el) => el.some((el2) => el2 === lineIndex))
  const block2 = blocks.find((el) => el.some((el2) => el2 === numberIndex))

  block1.forEach((i) => {
    block2.forEach((j) => {
      square.push(puzzle[i][j])
    })
  })

  return square
}

/**
 * Each array in array is a line, each number is line is a sudoku case
 * [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]]
 * @param {array of arrays} puzzle - Sudoku grid in array of arrays format
 */
const solveSudoku = (puzzle) => {
  let newPuzzle = [...puzzle]

  while (!isCompleted(newPuzzle)) {
    newPuzzle = newPuzzle.map((line, lineIndex) => {
      if (!line.some((el) => el === 0)) {
        return line
      }

      const newLine = line.map((number, numberIndex) => {
        if (number !== 0) {
          return number
        }

        let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        possibleNumbers = possibleNumbers.filter((n) => !line.some((el) => el === n))
        possibleNumbers = possibleNumbers.filter(
          (n) => !getColumn(newPuzzle, numberIndex).some((el) => el === n),
        )
        possibleNumbers = possibleNumbers.filter(
          (n) => !getSquare(newPuzzle, lineIndex, numberIndex).some((el) => el === n),
        )

        if (possibleNumbers.length === 1) {
          return possibleNumbers[0]
        }

        return number
      })

      return newLine
    })
  }

  console.log('newPuzzle', newPuzzle)
  return newPuzzle
}

export { solveSudoku }
