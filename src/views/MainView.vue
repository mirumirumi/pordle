<template>
  <div class="main">
    <div id="field">
      <TrySetVue v-for="trySet, index in trySetSet" :currentTrying="currentTrying + 1" :selfNumTry="index + 1" :positionOccuredChange="positionOccuredChange" :cards="trySet" :eventkicker="eventkicker" @passValidate="receiveValidateResult" @backspace="backspace" :key="index" />
    </div>
    <div id="deck">
      <transition name="fade">
        <div v-show="!isNotLoading" class="loading">
          <LoadCards />
        </div>
      </transition>
      <div v-for="suit in SUITS" class="suit" :key="suit">
        <div v-for="num in NUMS" class="card" :class="{ 'loaded': isNotLoading }" :id="suit + `_` + num" @click="chooseCard(suit, num)" :key="num">
          <transition name="fade">
            <img v-show="isNotLoading" :src="`cards/` + num + `_of_` + suit + `s.svg`" alt="🃏" @load="loaded">
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { isEmpty } from "../lib/utils"
import { Suit, Num, Status, Card, Cards, TrySet } from "../lib/defines"
import _ from "lodash"
import localForage from "localforage"
import TrySetVue from "../components/modules/TrySet.vue"
import LoadCards from "../components/parts/LoadCards.vue"

const SUITS: Array<Suit> = ["spade", "heart", "diamond", "club"]
const NUMS:  Array<Num> =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const currentTrying = ref(0)
const positionOccuredChange = ref("0_0")
const eventkicker = ref(0)

const isNotLoading = ref(false)
let numLoadedImages = 0

const loaded = () => {
  numLoadedImages++
  if (numLoadedImages === 52)
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
const cardsStatus = ref<Array<Array<Status>>>([
  Array(13),
  Array(13),
  Array(13),
  Array(13),
])

const chooseCard = (suit: Suit, num: Num) => {
  // do not do anything if the card has already been used
  if (suit === "spade")
    if (cardsStatus.value[0][num - 1] === "used")
       return
  if (suit === "heart")
    if (cardsStatus.value[1][num - 1] === "used")
      return
  if (suit === "diamond")
    if (cardsStatus.value[2][num - 1] === "used")
      return
  if (suit === "club")
    if (cardsStatus.value[3][num - 1] === "used")
      return

  // quit if the current trying set has already 5 cards
  if (trySetSet.value[currentTrying.value].every(e => !isEmpty(e)))
    return

  for (let i = 0; i < trySetSet.value[currentTrying.value].length; i++) {
    if (isEmpty(trySetSet.value[currentTrying.value][i])) {      
      positionOccuredChange.value = ((currentTrying.value + 1) + "_" + (i + 1))

      trySetSet.value[currentTrying.value][i] = {
        suit: suit,
        number: num,
      }

      eventkicker.value++

      if (suit === "spade") {
        cardsStatus.value[0][num - 1] = "used"
      }
      if (suit === "heart") {
        cardsStatus.value[1][num - 1] = "used"
      }
      if (suit === "diamond") {
        cardsStatus.value[2][num - 1] = "used"
      }
      if (suit === "club") {
        cardsStatus.value[3][num - 1] = "used"
      }

      break
    }
  }
  setCardStyles(suit, num)
}

const receiveValidateResult = async (result: boolean): Promise<void> => {
  if (!result)
    return

  // save tried data
  const now = await localForage.getItem("cards") as Array<Cards<Card>>
  if (now) {
    const added = _.cloneDeep(now)
    added.push(_.cloneDeep(trySetSet.value[currentTrying.value]))
    await localForage.setItem("cards", added)
  } else {  // at 1st time
    await localForage.setItem("cards", [_.cloneDeep(trySetSet.value[currentTrying.value])])
  }

  // check is_success!

}

const backspace = (card: Card) => {
  positionOccuredChange.value = (currentTrying.value + 1) + "_" + (parseInt(positionOccuredChange.value.replace(/^\d+_/, "")) - 1).toString()
  trySetSet.value[currentTrying.value][(parseInt(positionOccuredChange.value.replace(/^\d+_/, "")))] = {}

  let suitNum = 0
  if (card.suit === "spade")
    suitNum = 0
  if (card.suit === "heart")
    suitNum = 1
  if (card.suit === "diamond")
    suitNum = 2
  if (card.suit === "club")
    suitNum = 3
  cardsStatus.value[suitNum][card.number! - 1] = undefined
  removeCardStyles(card.suit!, card.number!)
}

const showHotKeys = () => {
  1
}

function setCardStyles(suit: Suit, num: Num): void {
  let suitNum = 0
  if (suit === "spade")
    suitNum = 0
  if (suit === "heart")
    suitNum = 1
  if (suit === "diamond")
    suitNum = 2
  if (suit === "club")
    suitNum = 3
  
  ;(document.getElementById(suit + "_" + num) as HTMLDivElement).classList.add("has_status")

  if (cardsStatus.value[suitNum][num - 1] === "hit") {
    ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.add("hit")
  }
  if (cardsStatus.value[suitNum][num - 1] === "blow") {
    ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.add("blow")
  }
  if (cardsStatus.value[suitNum][num - 1] === "failure" || cardsStatus.value[suitNum][num - 1] === "used") {
    ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.add("used")
  }
}

function removeCardStyles(suit: Suit, num: Num): void {
   (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.remove("has_status");
  ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.remove("hit");
  ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.remove("blow");
  ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.remove("failure");
  ((document.getElementById(suit + "_" + num) as HTMLDivElement).firstChild as HTMLDivElement).classList.remove("used");
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
        &.loaded {
          border: none;
        }
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
.has_status {
  opacity: 0.444;
  cursor: auto !important;
  img:hover {
    opacity: 1 !important;
  }
  img.hit {
    background-color: #00ad33;
  }
  img.blow {
    background-color: #dca900;
  }
  img.failure, img.used {
    background-color: #000000;
  }
}
</style>
