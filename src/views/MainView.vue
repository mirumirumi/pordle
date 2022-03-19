<template>
  <div class="main">
    <div id="field">
      <TrySetVue v-for="trySet, index in trySetSet" :currentTrying="currentTrying + 1" :selfNumTry="index + 1" :positionOccuredChange="positionOccuredChange" :cards="trySet" :eventkicker="eventkicker" @passValidate="receiveValidateResult" @batchValidate="batchValidate" @backspace="backspace" :ref="`TrySet_` + (index + 1)" :key="index" />
    </div>
    <div id="deck">
      <transition name="fade">
        <div v-show="!isNotLoading" class="loading">
          <LoadCards />
        </div>
      </transition>
      <div v-for="suit, s in SUITS" class="suit" :key="suit">
        <div v-for="num, n in NUMS" class="card" :class="{ 'loaded': isNotLoading }" :id="suit + `_` + num" @click="chooseCard(suit, num)" :key="num">
          <transition-group name="fade">
            <KeyName v-if="store.isShownHotKeys && n === 0" :keyName="KEY_NAMES_SUIT[s]" style="left: -35px;" :key="suit + num" />
            <KeyName v-if="store.isShownHotKeys && s === 0" :keyName="KEY_NAMES_NUM[n]" style="top: -25px; bottom: auto; left: 25%;" :key="suit + num" />
          </transition-group>
          <transition name="fade">
            <img v-show="isNotLoading" :src="`cards/` + num + `_of_` + suit + `s.svg`" alt="🃏" @load="loaded">
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import { useStore } from "@/store/store"
import { delay, isEmpty } from "../lib/utils"
import { Suit, Num, Status, Card, Cards, TrySet } from "../lib/defines"
import keyQueueHelper from "../lib/key-queue"
import generateAnswer from "../lib/generate-answer"
import compareWithAnswer from "../lib/compare-with-answer"
import _ from "lodash"
import localForage from "localforage"
import KeyName from "@/components/parts/KeyName.vue"
import TrySetVue from "../components/modules/TrySet.vue"
import LoadCards from "../components/parts/LoadCards.vue"

const store = useStore()

const SUITS: Array<Suit> = ["spade", "heart", "diamond", "club"]
const NUMS:  Array<Num>  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const KEY_NAMES_SUIT = ["S", "H", "D", "C"]
const KEY_NAMES_NUM  = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"]
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
const TrySet_1 = ref()
const TrySet_2 = ref()
const TrySet_3 = ref()
const TrySet_4 = ref()
const TrySet_5 = ref()

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

  keyQueue.splice(0)
  resetChoosingStyle()
}

const receiveValidateResult = async (result: boolean): Promise<void> => {
  if (!result)
    return

  const now = await localForage.getItem("cards") as Array<Cards<Card>>

  // save tried data
  if (now) {
    const added = _.cloneDeep(now)
    added.push(_.cloneDeep(trySetSet.value[currentTrying.value]))
    await localForage.setItem("cards", added)
  } else {  // at 1st time
    await localForage.setItem("cards", [_.cloneDeep(trySetSet.value[currentTrying.value])])
  }

  await gameMaster(trySetSet.value[currentTrying.value])

  // go next try...
  currentTrying.value++
}

onMounted(async () => {
  const savedCards = await localForage.getItem("cards") as Array<Cards<Card>>
  
  if (!savedCards)
   return

  for (let i = 0; i < savedCards.length; i++) {
    trySetSet.value[i] = savedCards[i]

    await nextTick()

    if (i + 1 === 1) {
      TrySet_1.value.batchOpenCards()
      currentTrying.value++
    }
    if (i + 1 === 2) {
      TrySet_2.value.batchOpenCards()
      currentTrying.value++
    }
    if (i + 1 === 3) {
      TrySet_3.value.batchOpenCards()
      currentTrying.value++
    }
    if (i + 1 === 4) {
      TrySet_4.value.batchOpenCards()
      currentTrying.value++
    }
    if (i + 1 === 5) {
      TrySet_5.value.batchOpenCards()
      currentTrying.value++
    }
  }
})

const batchValidate = async (cards: Cards<Card>) => {
  await gameMaster(cards)
}

async function gameMaster(cards: Cards<Card>) {
  // compare with answer
  const compareResult = compareWithAnswer(cards, generateAnswer())

  await setCardStylesForField(currentTrying.value + 1, compareResult)

  for (const suit of SUITS) {
    for (let j = 0; j < NUMS.length; j++) {
      for (let k = 0; k < 5; k++) {
        if (cards[k].suit === suit && cards[k].number === j + 1) {
          const suitNum = suitToNum(suit as Suit)
          cardsStatus.value[suitNum][j] = compareResult[k]
        }
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    setCardStylesForDeck(cards[i].suit as Suit, cards[i].number as Num)
  }

  // clear a game!
  if (compareResult.every(e => e === "hit")) {
  


    return
  }

  // lose a geme...
  if (currentTrying.value === 5) {




    return
  }
}

const backspace = (card: Card) => {
  positionOccuredChange.value = (currentTrying.value + 1) + "_" + (parseInt(positionOccuredChange.value.replace(/^\d+_/, "")) - 1).toString()
  trySetSet.value[currentTrying.value][(parseInt(positionOccuredChange.value.replace(/^\d+_/, "")))] = {}

  const suitNum = suitToNum(card.suit as Suit)
  cardsStatus.value[suitNum][card.number! - 1] = undefined
  removeCardStyles(card.suit!, card.number!)
}

function setCardStylesForDeck(suit: Suit | string, num: Num): void {
  const suitNum = suitToNum(suit as Suit)
  
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

const keyQueue: Array<string> = []

document.addEventListener("keydown", (e: KeyboardEvent) => {
  keyQueue.push(e.key)

  const { suit, number } = keyQueueHelper(keyQueue)
  if (keyQueue.length === 2) {
    if (suit && number) chooseCard(suit, number)
    for (const suittt of SUITS) {
      for (let i = 0; i < 13; i++) {
        (document.getElementById(suittt + "_" + (i + 1).toString()) as HTMLDivElement).classList.remove("choose");
      }
    }
    keyQueue.splice(0)
    return
  }

  if (e.key === "s" || e.key === "h" || e.key === "d" || e.key === "c") {
    e.preventDefault()
    setChoosingStyleForSuits(suit as Suit)
  }
  if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9" || e.key === "0" || e.key === "j" || e.key === "q" || e.key === "k") {
    e.preventDefault()
    setChoosingStyleForNumbers(suit as Suit, number as Num)
  }
})

function setChoosingStyleForSuits(suit: Suit): void {
  for (let i = 0; i < 13; i++) {
    (document.getElementById(suit + "_" + (i + 1).toString()) as HTMLDivElement).classList.remove("used");
    (document.getElementById(suit + "_" + (i + 1).toString()) as HTMLDivElement).classList.add("choose");
  }
}

function setChoosingStyleForNumbers(suit: Suit, number: Num): void {
  for (const suit of SUITS) {
    for (let i = 0; i < 13; i++) {
      if (i + 1 === number) {
        (document.getElementById(suit + "_" + (i + 1).toString()) as HTMLDivElement).classList.remove("used");
        (document.getElementById(suit + "_" + (i + 1).toString()) as HTMLDivElement).classList.add("choose");
      }
    }
  }
}

function resetChoosingStyle(): void {
  for (const suit of SUITS) {
    for (let i = 0; i < 13; i++) {
      (document.getElementById(suit + "_" + (i + 1).toString()) as HTMLDivElement).classList.remove("choose");
    }
  }
}

function suitToNum(suit: Suit): number {
  let suitNum = 0
  if (suit === "spade")
    suitNum = 0
  if (suit === "heart")
    suitNum = 1
  if (suit === "diamond")
    suitNum = 2
  if (suit === "club")
    suitNum = 3
  return suitNum
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
        position: relative;
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
          transition: 0.23s all ease-out;
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
.choose {
  background-color: #0099ff;
}
.hit > img, .blow > img, .failure > img, .used > img, .choose > img {
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
