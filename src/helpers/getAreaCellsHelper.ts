import { IBoardArea } from "@/types/IBoardArea"
import { ISudokuCell } from "@/types/ISudokuCell"

export default (area: IBoardArea, cells: ISudokuCell[]): ISudokuCell[] => {
  if (area.x === null && area.y) return cells.filter(cell => cell.y === area.y)
  if (area.x && area.y === null) return cells.filter(cell => cell.x === area.x)
  const squareArea: ISudokuCell[] = []
  for (let y = area.y!; y < area.y! + 3; y++) {
    for (let x = area.x!; x < area.x! + 3; x++) {
      squareArea.push(cells[x + y * 9])
    }
  }
  return squareArea
}