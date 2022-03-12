<template>
  <svg focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
    <path v-if="icon == ``" :fill="color" d=""></path>
  </svg>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const p = defineProps<{
  icon: string,
  color: string,
}>()

const viewBox = ref("0 0 512 512")
setViewBox()

watch(p, () => {
  setViewBox()
})

function setViewBox(): void {
  switch (p.icon) {
    case "github":
      viewBox.value = "0 0 512 512"
      break
  }
}
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 1.1em;
}
</style>
