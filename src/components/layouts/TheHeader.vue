<template>
  <div class="header_wrap">
    <header>
      <div class="dummy" style="width: 120px;"></div>
      <div class="title">
        <span>Pordle</span>
      </div>
      <div class="menu">
        <div class="how_to_play" @click="showHowToPlay">
          <SvgIcon icon="how_to_play" color="#e4e4e4" />
        </div>
        <div class="statitics" @click="showHotKeys">
          <SvgIcon icon="keyboard" color="#e4e4e4" />
        </div>
        <div class="royal" @click="showStraightFlush">
          <SvgIcon icon="royal" color="#e4e4e4" />
          <div v-if="hasBeenNotOpenStraightFlush" class="red_circle"></div>
        </div>
      </div>
    </header>
    <teleport to="body">
      <TransparentBack v-if="isOpenBack" @click="closeBack" />
      <transition name="howan">
        <ModalBase v-if="isOpenModalHowToPlay" className="hwt" @closeModal="closeModal">
          <div class="title">
            <span>あそびかた</span>
          </div>
          <div class="content">
            <ul class="list">
              <li>解答は <strong>ツーペア以上</strong> の役が含まれた <strong>ソート済み</strong> の 5 枚です（役がワンペアだった場合には不毛な総当たり攻撃を仕掛けるしかなくゲーム性が著しく損なわれるので…）。</li>
              <li>ソート順は一般的なポーカーおよびトランプのルールにもとづいています。</li>
              <li>入力時の手札は <strong>役なしでも OK</strong> です。ただし同じカードは使えません。</li>
              <li>本家の Wordle と同じく、日ごとに解答がランダム生成されます。</li>
              <li>キーボードだけで遊べます。</li>
            </ul>
            <div class="figure">
              <img src="@/assets/how-to-play.png" alt="how-to-play">
            </div>
          </div>
        </ModalBase>
      </transition>
      <transition name="howan">
        <ModalBase v-if="isOpenStraightFlush" className="straight_flush" @closeModal="closeModal">
          <div class="title">
            <span>ロイヤルストレートフラッシュの日くらいは遊びに来てやってもいいですって？</span>
          </div>
          <div class="content">
            <p>メールアドレスを登録すると、解答がロイヤルストレートフラッシュの日に通知を受け取れます！確実な勝利を手にしましょう。</p>
            <p>…と思ったんだけど、プログラムを使ってシミュレーションしてみたら次のロイヤルストレートフラッシュは西暦 3891 年 10 月 28 日までやってこないことがわかったんだ。僕は本当にこの機能を作るべきなのか少しだけ考えたあとに、そっとコードエディタを閉じました。なので下にある送信ボタンはあなたのメールアドレスをどこへも送ったりはしません 😞</p>
            <div class="form">
              <input type="text" class="input" placeholder="name@exmaple.com" disabled>
              <button type="button" class="button fill" @click="onSubmit">Submit</button>
            </div>
          </div>
        </ModalBase>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toBool } from '@/lib/utils'
import { useStore } from '@/store/store'
import SvgIcon from '../parts/SvgIcon.vue'
import TransparentBack from '../parts/TransparentBack.vue'
import ModalBase from "../modules/ModalBase.vue"

const store = useStore()

const isOpenModalHowToPlay = ref(toBool(localStorage.getItem("isOpenModalHowToPlay") ?? "true"))
const isOpenStraightFlush = ref(false)
const hasBeenNotOpenStraightFlush = ref(toBool(localStorage.getItem("hasBeenNotOpenStraightFlush") ?? "true"))
const isOpenBack = ref(false)

const showHowToPlay = (): void => {
  isOpenModalHowToPlay.value = true
}

const showHotKeys = (): void => {
  isOpenBack.value = true
  store.isShownHotKeys = true
}

const showStraightFlush = () => {
  isOpenStraightFlush.value = true
  localStorage.setItem("hasBeenNotOpenStraightFlush", "false")
}

const closeModal = (): void => {
  isOpenModalHowToPlay.value = false
  isOpenStraightFlush.value = false
  localStorage.setItem("isOpenModalHowToPlay", "false")
}

const closeBack = () => {
  isOpenBack.value = false
  store.isShownHotKeys = false
}

const onSubmit = () => {
  alert('わざわざ押してくれてありがとう！')
}
</script>

<style scoped lang="scss">
.header_wrap{
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    height: 60px;
    margin: auto;
    padding: 10px 30px;
    .title {
      user-select: none;
      font-size: 2em;
      font-weight: bold;
    }
    .menu {
      display: flex;
      > div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        .red_circle {
          position: absolute;
          top: 0;
          right: 0;
          width: 7px;
          height: 7px;
          background-color: #f00;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.hwt {
  max-width: 666px !important;
  height: 77% !important;
  max-height: 555px !important;
  padding: 0 3em;
  .title {
    margin-bottom: 0.7em;
    font-size: 1.5em;
    font-weight: bold;
    letter-spacing: 3px;
  }
  .content {
    font-size: 0.98em;
    .list {
      margin-bottom: 2.1em;
      li {
        list-style-type: disc;
        margin: 0.3em auto;
        padding-left: 0.3em;
        line-height: 1.4;
      }
    }
    .figure {
      text-align: center;
      img {
        width: 90%;
        aspect-ratio: 3.046;
      }
    }
  }
}
.straight_flush {
  max-width: 666px !important;
  padding: 0 3em;
  .title {
    margin-bottom: 0.7em;
    font-size: 1.5em;
    font-weight: bold;
    letter-spacing: 3px;
    line-height: 1.3;
  }
  .content {
    font-size: 0.98em;
  }
  .form {
    margin-top: 1.5em;
    text-align: center;
    > * {
      margin: auto 1em;
    }
    input {
      height: 35px;
      padding: 5px 9px;
      border: solid 1px #e4e4e4;
      border-radius: 4.4px;
      background-color: #f6f8fa;
      color: #37342f;
      vertical-align: middle;
      outline: none;
      appearance: none;
    }
    button {
      height: 35px;
      padding: 0.23em 1.1rem 0.3em;
    }
  }
}
</style>
