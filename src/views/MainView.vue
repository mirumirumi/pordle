<template>
  <div class="main">
    <div id="field">
      <TrySetVue v-for="trySet, index in trySetSet" :positionTrySet="index + 1" :currentTrying="currentTrying" :cards="trySet" :key="index" />
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
import { Card, Cards, TrySet } from "../utils/defines"
import TrySetVue from "../components/modules/TrySet.vue"
import LoadCards from "../components/parts/LoadCards.vue"

const SUITS = ["spade", "heart", "diamond", "club"]
const currentTrying = ref(1)

const isNotLoading = ref(false)
let numLoadedImages = 0

const loaded = () => {
  numLoadedImages++
  if (numLoadedImages == 52)
    isNotLoading.value = true
}

const trySetSet = ref<TrySet<Cards<Card>>>([
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
])

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
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          filter: saturate(0.7);
          &:hover {
            opacity: 0.777;            
          }
        }
      }
    }
  }
}
</style>
