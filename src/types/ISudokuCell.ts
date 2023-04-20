type TCellType = 'static' | 'writable'

export interface ISudokuCell {
  x: number;
  y: number;
  value: number;
  isActive?: boolean;
  type: TCellType;
  isWrong: boolean;
}