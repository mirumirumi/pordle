<template>
  <div class="header_wrap">
    <header>
      <div class="dummy" style="width: 120px;"></div>
      <div class="title">
        <span>Pordle</span>
      </div>
      <div class="menu">
        <div class="how_to_play">
          <SvgIcon icon="how_to_play" color="#e4e4e4" />
        </div>
        <div class="statitics">
          <SvgIcon icon="statitics" color="#e4e4e4" />
        </div>
        <div class="royal" @click="showRoyal">
          <SvgIcon icon="royal" color="#e4e4e4" />
          <div v-if="isNotShowedRoyal" class="red_circle"></div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toBool } from '@/utils/utils'
import SvgIcon from '../parts/SvgIcon.vue'

const isNotShowedRoyal = ref(toBool(localStorage.getItem("isNotShowedRoyal") ?? "true"))

const showRoyal = () => {
  isNotShowedRoyal.value = false
  localStorage.setItem("isNotShowedRoyal", "false")
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
