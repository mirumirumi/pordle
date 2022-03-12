<template>
  <div class="main">
    <div id="field">
      <div v-for="tries in MAX_TRIES" class="try_set" :key="tries">
        <div v-for="card in 5" class="input_box" :id="tries + `_` + card" :key="card"></div>
      </div>
    </div>
    <div id="deck">
      <transition name="fade">
        <div v-show="!isNotLoading" class="loading">
          <LoadCards />
        </div>
      </transition>
      <div v-for="suit in SUITS" class="suit" :key="suit">
        <div v-for="number in 13" class="card" @click="chooseCard(suit, number)" :key="number">
          <transition name="fade">
            <img v-show="isNotLoading" :src="`cards/` + number + `_of_` + suit + `s.svg`" alt="🃏" @load="loaded">
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import LoadCards from "../components/parts/LoadCards.vue"

const MAX_TRIES = 6
const SUITS = ["spade", "heart", "diamond", "club"]

const isNotLoading = ref(false)
let numLoadedImages = 0

const loaded = () => {
  numLoadedImages++
  if (numLoadedImages == 52)
    isNotLoading.value = true
}

const chooseCard = (suit: string, number: number) => {
  1
}

const showHotKeys = () => {
  1
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  margin: auto;
  > div {
    padding: 5px 0;
    text-align: center;
  }
  #field {
    height: 60%;
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
  }
  #deck {
    position: relative;
    height: 40%;
    padding-bottom: 7px;
    .loading {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .suit {
      height: 25%;
      padding: 3px 0;
      display: flex;
      justify-content: center;
      .card {
        display: inline-block;
        width: auto;
        height: 100%;
        aspect-ratio: 0.6887;
        margin: auto 3px;
        border: solid 1px #5d5d68;
        border-radius: 3px;
        img, svg {
          width: 100%;
          height: 100%;
          filter: saturate(0.7);
        }
      }
    }
  }
}
</style>
