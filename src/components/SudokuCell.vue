<template>
  <div class="sudoku-cell">
    <div
      class="sudoku-cell__screen"
      :class="{
        active: cell.isActive,
        static: cell.type === 'static',
        'with-hover': cell.type === 'writable',
        wrong: cell.isWrong
      }"
    ></div>
    <div
      v-if="cell.value"
      class="sudoku-cell__value"
    >
      {{ cell.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ISudokuCell } from '@/types/ISudokuCell'

defineProps<{
  cell: ISudokuCell
}>()


</script>

<style scoped lang="scss">
.sudoku-cell {
  width: 50px;
  height: 50px;
  position: relative;
  border: 1px solid rgb(43, 43, 43);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: white;
  &__value {
    font-size: 24px;
    font-family: monospace;
    font-weight: 600;
    color: rgb(6, 6, 24);
  }
  &__screen {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 300;
  }
}
.static {
  background: rgba(3, 19, 241, 0.2);
}
.with-hover {
  transition: all 0.5s;
}
.with-hover:hover {
  background: rgba(0, 224, 0, 0.3);
  transition: all 0.5s;
}
.active {
  background: rgba(0, 224, 0, 0.3);
}
.wrong {
  box-shadow: 0px 0px 5px 5px rgba(253, 30, 0, 0.7) inset;
}
</style>