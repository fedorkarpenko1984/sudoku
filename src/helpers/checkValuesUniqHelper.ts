import { ISudokuCell } from "@/types/ISudokuCell";

export default (area: ISudokuCell[]) => {
  const filteredCells = area.filter(cell => cell.value !== 0)
  const values: Set<number> = new Set()
  let isUnique = true
  filteredCells.forEach(cell => {
    if (values.has(cell.value!)) isUnique = false
    values.add(cell.value)
  })
  return isUnique
}