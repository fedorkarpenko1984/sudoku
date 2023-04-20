<template>
  <button class="control-btn">
    <slot />
  </button>
</template>

<script setup lang="ts">
type TControlBtnType = 'help' | 'again'
const props = defineProps<{
  btnType: TControlBtnType
}>()
const color = (() => {
  if (props.btnType === 'help') return 'rgb(13, 71, 230)'
  if (props.btnType === 'again') return 'orangered'
})()
</script>

<style scoped lang="scss">
.control-btn {
  width: 170px;
  height: 48px;
  outline: none;
  border: none;
  font-size: 20px;
  font-family: monospace;
  font-weight: 500;
  background: white;
  display: block;
  box-shadow: 0px 0px 2px 2px v-bind(color) inset;
  color: v-bind(color);
  transition: all 0.5s;
  border-radius: 3px;
  &:hover {
    box-shadow: 0px 0px 4px 4px v-bind(color) inset;
    font-weight: 600;
    transition: all 0.5s;
  }
}
.again {
  box-shadow: 0px 0px 2px 2px orangered inset;
  color: orangered;
  &:hover {
    box-shadow: 0px 0px 4px 4px orangered inset;
  }
}
.help {
  box-shadow: 0px 0px 2px 2px rgb(13, 71, 230) inset;
  color: rgb(13, 71, 230);
  &:hover {
    box-shadow: 0px 0px 4px 4px rgb(13, 71, 230) inset;
  }
}
</style>