<template>
  <div class="header_wrap">
    <header>
      <div class="dummy" style="width: 80px;"></div>
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
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../parts/SvgIcon.vue'


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
        margin: auto 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
