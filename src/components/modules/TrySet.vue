<template>
  <div class="try_set">
    <div v-for="card, index in cards" class="input_box" :id="positionTrySet + `_` + card" :key="index"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Card } from "../../utils/defines"

defineProps<{
  positionTrySet: number,
  currentTrying:  number,
  cards:          Array<Card>,
}>()







</script>

<style lang="scss" scoped>
.try_set {
  height: 16.666%;
  padding: 3px 0;
  .input_box {
    display: inline-block;
    width: auto;
    height: 100%;
    aspect-ratio: 0.6887;
    margin: auto 4px;
    border: solid 1.7px #5d5d68;
    border-radius: 3px;
  }
}
</style>
