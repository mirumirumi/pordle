<template>
  <div class="try_set">
    <div v-for="card, index in cards" class="input_box" :class="{ 'loaded': isShowCard[index] }" :id="currentTrying + `_` + (index + 1)" :key="index">
      <transition name="gyun">
        <img v-if="isShowCard[index]" :src="`cards/` + card.number + `_of_` + card.suit + `s.svg`" alt="🃏">
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from "vue"
import { Card } from "../../lib/defines"

const p = defineProps<{
  currentTrying: number,
  selfNumTry: number,
  positionOccuredChange: string,
  cards: Array<Card>,
}>()

const positionOccuredChange = toRef(p, "positionOccuredChange")
const isShowCard = ref<Array<boolean>>(Array(5).fill(false))

watch(positionOccuredChange, (_new: string) => {
  const numCard = parseInt(_new.replace(/^\d+_/, ""))

  if (p.currentTrying !== p.selfNumTry)
    return

  isShowCard.value[numCard - 1] = true
})





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
    &.loaded {
      border: none;
    }
    img {
      width: 100%;
      height: 100%;
      filter: saturate(0.7);
    }
  }
}
</style>
