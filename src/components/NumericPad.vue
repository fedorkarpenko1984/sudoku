<template>
  <div class="numeric-pad">
    <div class="numeric-pad__base-buttons">
      <button
        v-for="digit in 9"
        :key="digit"
        class="numeric-pad__btn"
        :digit="digit"
        @click.stop="$emit('input:digit', digit)"
      >
        {{ digit }}
      </button>
    </div>
    <div class="numeric-pad__empty-button-wrapper">
      <button
        class="numeric-pad__btn"
        @click="$emit('input:digit', 0)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NumericButton from '@/UI/NumericButton.vue'

const emit = defineEmits<{
  (event: 'input:digit', digit: number): void
}>()
</script>

<style scoped lang="scss">
.numeric-pad {
  width: fit-content;
  position: relative;
  &__base-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;
  }
  &__empty-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  &__btn {
    border: 2px solid grey;
    width: 50px;
    height: 40px;
    border-radius: 3px;
    outline: none;
    font-size: 20px;
    font-family: monospace;
    font-weight: 600;
    color: rgb(41, 41, 41);
    background: white;
    box-sizing: border-box;
    transition: all 0.3s;
  }
  &__btn:hover {
    box-shadow: 0px 0px 2px 1px rgb(80, 80, 80) inset;
    transition: all 0.3s;
  }
}
</style>