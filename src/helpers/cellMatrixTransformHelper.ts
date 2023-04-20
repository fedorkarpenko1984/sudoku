import { ISudokuCell } from "@/types/ISudokuCell"

export default (matrix: Array<number>[]): ISudokuCell[] => {
  const cells: ISudokuCell[] = []
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      cells.push({
        x,
        y,
        value,
        type: value !== 0 ? 'static' : 'writable',
        isWrong: false
      })
    })
  })
  return cells
}