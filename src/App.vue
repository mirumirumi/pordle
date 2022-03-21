<template>
  <TheHeader />
  <main class="view_wrap">
    <router-view/>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from "@/components/layouts/TheHeader.vue"
import TheFooter from "@/components/layouts/TheFooter.vue"
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text;
  background-color: $background;
  height: 100%;
  .view_wrap {
    height: calc(100% - (60px + 30px));
  }
}
@include mobile {
  .mobile_none {
    display: none;
  }
}
</style>
