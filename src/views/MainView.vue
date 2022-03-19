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
import { delay, isEmpty } from "../lib/utils"
import { Suit, Num, Status, Card, Cards, TrySet } from "../lib/defines"
import generateAnswer from "../lib/generate-answer"
import compareWithAnswer from "../lib/compare-with-answer"
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
  // setCardStylesForDeck(suit, num)  // chooseable any card as many times until compare with answer & match the specification of the original Wordle
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

  // compare with answer
  const compareResult = compareWithAnswer(trySetSet.value[currentTrying.value], generateAnswer())

  await setCardStylesForField(currentTrying.value + 1, compareResult)

  for (const suit of SUITS) {
    for (let j = 0; j < NUMS.length; j++) {
      for (let k = 0; k < 5; k++) {
        if (trySetSet.value[currentTrying.value][k].suit === suit && trySetSet.value[currentTrying.value][k].number === j + 1) {
          let suitNum = 0
          if (suit === "spade")
            suitNum = 0
          if (suit === "heart")
            suitNum = 1
          if (suit === "diamond")
            suitNum = 2
          if (suit === "club")
            suitNum = 3
          cardsStatus.value[suitNum][j] = compareResult[k]
        }
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    setCardStylesForDeck(trySetSet.value[currentTrying.value][i].suit as Suit, trySetSet.value[currentTrying.value][i].number as Num)
  }

  // game clear!
  if (compareResult.every(e => e === "hit")) {
  


    return
  }

  // go next try...
  currentTrying.value++
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

function setCardStylesForDeck(suit: Suit | string, num: Num): void {
  let suitNum = 0
  if (suit === "spade")
    suitNum = 0
  if (suit === "heart")
    suitNum = 1
  if (suit === "diamond")
    suitNum = 2
  if (suit === "club")
    suitNum = 3
  
  if (cardsStatus.value[suitNum][num - 1] === "hit") {
    (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.remove("used");
    (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.add("hit")
  }
  if (cardsStatus.value[suitNum][num - 1] === "blow") {
    (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.remove("used");
    (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.add("blow")
  }
  if (cardsStatus.value[suitNum][num - 1] === "failure" || cardsStatus.value[suitNum][num - 1] === "used") {
    (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.add("used")
  }
}

function removeCardStyles(suit: Suit, num: Num): void {
  for (const className of ["has_status", "hit", "blow", "failure", "used"]) {
    (document.getElementById(suit + "_" + num) as HTMLDivElement).classList.remove(className)
  }
}

async function setCardStylesForField(currentTrying: number, resultArray: Array<Status>): Promise<void> {
  for (let i = 0; i < 5; i++) {
    (document.getElementById(currentTrying + "_" + (i + 1).toString()) as HTMLDivElement).classList.add("mekuru");
    await delay(222)
    if (resultArray[i] === "hit") {
      (document.getElementById(currentTrying + "_" + (i + 1).toString()) as HTMLDivElement).classList.add("hit");
    }
    if (resultArray[i] === "blow") {
      (document.getElementById(currentTrying + "_" + (i + 1).toString()) as HTMLDivElement).classList.add("blow");
    }
    if (resultArray[i] === "failure") {
      (document.getElementById(currentTrying + "_" + (i + 1).toString()) as HTMLDivElement).classList.add("failure");
    }
    await delay(200)
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  margin: auto;
  text-align: center;
  > div {
    padding: 5px 0;
    text-align: center;
  }
  #field {
    display: inline-block;
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
        transition: 0.23s all ease-out;
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
</style>
<style lang="scss">
.hit {
  background-color: #00ad33;
}
.blow {
  background-color: #dca900;
}
.failure, .used {
  background-color: #000000;
}
.hit > img, .blow > img, .failure > img, .used > img {
  opacity: 0.444;
  &:hover {
    opacity: 0.333 !important;
  }
}
.mekuru {
  animation: mekuru 0.444s cubic-bezier(.5,.24,.65,.92);
}
@keyframes mekuru {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
