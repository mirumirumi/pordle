<template>
  <svg focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
    <path v-if="icon == `how_to_play`" :fill="color" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"/>
    <path v-if="icon == `statitics`" :fill="color" d="M32 32C49.67 32 64 46.33 64 64V400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32zM160 224C177.7 224 192 238.3 192 256V320C192 337.7 177.7 352 160 352C142.3 352 128 337.7 128 320V256C128 238.3 142.3 224 160 224zM288 320C288 337.7 273.7 352 256 352C238.3 352 224 337.7 224 320V160C224 142.3 238.3 128 256 128C273.7 128 288 142.3 288 160V320zM352 192C369.7 192 384 206.3 384 224V320C384 337.7 369.7 352 352 352C334.3 352 320 337.7 320 320V224C320 206.3 334.3 192 352 192zM480 320C480 337.7 465.7 352 448 352C430.3 352 416 337.7 416 320V96C416 78.33 430.3 64 448 64C465.7 64 480 78.33 480 96V320z"/>
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
    case "how_to_play":
    case "statitics":
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
