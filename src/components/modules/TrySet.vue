<template>
  <div class="try_set" :class="{ 'failed': validateFailed }">
    <div v-for="card, index in cards" class="input_box" :class="{ 'loaded': isShowCard[index] }" :id="currentTrying + `_` + (index + 1)" :key="index">
      <transition name="gyun">
        <img v-if="isShowCard[index]" :src="`cards/` + card.number + `_of_` + card.suit + `s.svg`" alt="🃏">
      </transition>
      <div v-if="index === 4 && (cards[0].suit && cards[0].number)" class="card_buttons backspace" @click="backspace">
        <SvgIcon icon="backspace" color="#5d5d68" />
      </div>
      <div v-if="index === 4 && isReadyValidate" class="card_buttons go_validate" @click="validate">
        <SvgIcon icon="go" color="#5d5d68" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from "vue"
import { Card, Cards } from "../../lib/defines"
import SvgIcon from "../parts/SvgIcon.vue"
import validateHand from "../../lib/validate-hand"

const p = defineProps<{
  currentTrying: number,
  selfNumTry: number,
  positionOccuredChange: string,
  cards: Cards<Card>,
}>()

const emit = defineEmits<{
  (e: "passValidate", result: boolean): void,
}>()

const positionOccuredChange = toRef(p, "positionOccuredChange")
const isShowCard = ref<Array<boolean>>(Array(5).fill(false))
const isReadyValidate = ref(false)

watch(positionOccuredChange, (_new: string) => {
  if (p.currentTrying !== p.selfNumTry)
    return

  const numCard = parseInt(_new.replace(/^\d+_/, ""))
  isShowCard.value[numCard - 1] = true

  if (isShowCard.value.every(e => e)) {
    isReadyValidate.value = true
  }
})

const validateFailed = ref(false)

const validate = () => {
  if (!validateHand(p.cards)) {
    emit("passValidate", false)
    validateFailed.value = true
    setTimeout(() => validateFailed.value = false, 500)
    return
  }

  console.log("OKです")

  emit("passValidate", true)


}

const backspace = () => {
  1
}
</script>

<style lang="scss" scoped>
.try_set {
  height: 16.666%;
  padding: 3px 0;
  .input_box {
    position: relative;
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
  .card_buttons {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -23px;
    cursor: pointer;
    svg {
      width: 1.5em;
    }
  }
  &.failed {
    animation: failed 0.29s;
  }
  .backspace {
    right: -23px;
  }
  .loaded .backspace {
    right: calc(-23px + 1.7px);  // border 1.7px (why not 1.7*2?)
  }
  .go_validate {
    right: calc(-23px - 2.9em);
  }
}
</style>
<style lang="scss">
@keyframes failed {
  0% {
    transform: translateX(-1.5px);
  }
  20% {
    transform: translateX(3.5px);
  }
  40% {
    transform: translateX(-3.5px);
  }
  60% {
    transform: translateX(3.5px);
  }
  80% {
    transform: translateX(-1.5px);
  }
  100% {
    transform: translateX(0px);
  }
}
.backspace:hover {
  svg {
    path {
      fill: #af5a5a;
    }
  }
}
.go_validate:hover {
  svg {
    path {
      fill: #207f20;
    }
  }
}
</style>
