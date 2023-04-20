<template>
  <div class="wrapper">
    <div class="sudoku-board" @click.stop>
      <sudoku-cell
        v-for="(cell, index) in sudokuCells"
        :key="index" :cell="cell"
        @click="cellClickHandler(cell)"
      />
      <!-- mask -->
      <div class="mask-line horizontal hor1"></div> 
      <div class="mask-line horizontal hor2"></div> 
      <div class="mask-line horizontal hor3"></div> 
      <div class="mask-line horizontal hor4"></div> 
      <div class="mask-line vertical ver1"></div>
      <div class="mask-line vertical ver2"></div>
      <div class="mask-line vertical ver3"></div>
      <div class="mask-line vertical ver4"></div>
    </div>
    <div class="controls">
      <numeric-pad @input:digit="numericPadHandler($event)" />
      <div class="buttons">
        <control-btn
          btnType="help"
          @click.stop="helpBtnHendler"
          v-if="expectedAnswersMatrix"
        >
          ПОДСКАЗКА
        </control-btn>
        <control-btn
          btnType="again"
          @click="againBtnHendler"
        >ЗАНОВО</control-btn>
      </div>
    </div>
  </div>
  <h2
    v-if="showCongretulations"
    class="congretulations"
  >
    Вы справились!
  </h2>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SudokuCell from '@/components/SudokuCell.vue'
import NumericPad from '@/components/NumericPad.vue'
import ControlBtn from '@/components/ControlBtn.vue'
import { ISudokuCell } from '@/types/ISudokuCell'
import cellMatrixTransformHelper from '@/helpers/cellMatrixTransformHelper'
import checkValuesUniqHelper from '@/helpers/checkValuesUniqHelper'
import getAreaCellsHelper from '@/helpers/getAreaCellsHelper'
import { IBoardArea } from '@/types/IBoardArea'

const props = defineProps<{
  matrix: Array<number>[];
  expectedAnswersMatrix?: Array<number>[];
}>()

const sudokuCells = ref<ISudokuCell[]>(cellMatrixTransformHelper(props.matrix))
let expectedAnswers: ISudokuCell[] = []
if (props.expectedAnswersMatrix) expectedAnswers = cellMatrixTransformHelper(props.expectedAnswersMatrix)

let activeCell: ISudokuCell | null = null

const clearActiveCell = () => {
  if (activeCell) activeCell.isActive = false
  activeCell = null
}

const showCongretulations = ref<boolean>(false)

const isBoardComplite = () => {
  const emptyCells = sudokuCells.value.filter(cell => cell.value === 0)
  if (emptyCells.length === 0) showCongretulations.value = true
  return emptyCells.length === 0
}

const cellClickHandler = (newCell: ISudokuCell) => {
  if (isBoardComplite()) return
  if (newCell.type === 'static') return
  if (activeCell && activeCell.x === newCell.x && activeCell.y === newCell.y) return
  if (activeCell) activeCell.isActive = false
  activeCell = newCell
  activeCell.isActive = true
}

const keyboardHendler = (event: KeyboardEvent) => {
  if (isBoardComplite()) return
  console.log(event)
  if (event.keyCode === 46 || event.keyCode === 8 || event.code === "Space" && activeCell) {
    activeCell!.value = 0
    updateWrongAreas()
    return
  }
  if (event.keyCode < 49 || event.keyCode > 57) return
  if (activeCell) {
    activeCell.value = event.keyCode - 48
    updateWrongAreas()
  }
}

const numericPadHandler = (digit: number) => {
  if (isBoardComplite()) return
  if (activeCell) {
    activeCell.value = digit
    updateWrongAreas()
  }
}

let wrongAreas: IBoardArea[] = []

function updateWrongAreas() {
  const activeCellCurrentAreas: IBoardArea[] = [
    {
      x: null,
      y: activeCell!.y
    },
    {
      x: activeCell!.x,
      y: null
    },
    {
      x: Math.floor(activeCell!.x / 3) * 3,
      y: Math.floor(activeCell!.y / 3) * 3
    }
  ]
  activeCellCurrentAreas.forEach(currentArea => {
    const isValuesInAreaUnique = checkValuesUniqHelper(
      getAreaCellsHelper(currentArea, sudokuCells.value)
    )
    const isAreaInWrongAreas = !!wrongAreas
      .find(area => area.x === currentArea.x && area.y === currentArea.y)
    if (!isValuesInAreaUnique && !isAreaInWrongAreas) {
      wrongAreas.push(currentArea)
    }
    if (isValuesInAreaUnique && isAreaInWrongAreas) {
      const index = wrongAreas
        .findIndex(area => area.x === currentArea.x && area.y === currentArea.y)
      wrongAreas.splice(index, 1)
    }
  })
  const wrongCells = (new Array(81)).fill(false)
  wrongAreas.forEach(area => {
    const areaCells = getAreaCellsHelper(area, sudokuCells.value)
    areaCells.forEach(cell => {
      wrongCells[cell.y * 9 + cell.x] = true
    })
  })
  sudokuCells.value.forEach((cell, index) => cell.isWrong = wrongCells[index])
}

const helpBtnHendler = () => {
  if (isBoardComplite()) return
  if (!activeCell?.isWrong) activeCell = null
  if (!activeCell) {
    const targetCell = (() => {
      const emptyCells = sudokuCells.value.filter(cell => cell.value === 0)
      return emptyCells[Math.round((emptyCells.length - 1) * Math.random())] 
    })()
    activeCell = targetCell
  }
  const newValue = expectedAnswers
    .find(cell => cell!.x === activeCell!.x && cell!.y === activeCell!.y)
    ?.value
  activeCell!.value = newValue!
  activeCell!.type = 'static'
  updateWrongAreas()
  clearActiveCell()
}

const againBtnHendler = () => {
  sudokuCells.value = cellMatrixTransformHelper(props.matrix)
  showCongretulations.value = false
}

onMounted(() => {
  window.addEventListener('keyup', keyboardHendler)
  window.addEventListener('click', clearActiveCell)
})
onUnmounted(() => {
  window.removeEventListener('keyup', keyboardHendler)
  window.removeEventListener('keyup', clearActiveCell)
})

</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
}
.sudoku-board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(9, 50px);
  width: fit-content;
  border: 1px solid black;
  background: rgb(58, 58, 58);
  .sudoku-board__mask {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
  }
}
.controls {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.buttons {
  margin-top: 20px;
}
.buttons > * + * {
  margin-top: 20px;
}
.congretulations {
  color: rgb(54, 54, 56);
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  font-family: monospace;
  margin-top: 24px;
}
.mask-line {
  position: absolute;
  background: black;
  z-index: 500;
}
.horizontal {
  width: 450px;
  height: 2px;
  left: 0;
}
.hor1 {
  top: 0;
}
.hor2 {
  top: 149px;
}
.hor3 {
  top: 299px;
}
.hor4 {
  bottom: 0;
}
.vertical {
  width: 2px;
  height: 450px;
  top: 0;
}
.ver1 {
  left: 0;
}
.ver2 {
  left: 149px
}
.ver3 {
  left: 299px;
}
.ver4 {
  right: 0;
}
</style>