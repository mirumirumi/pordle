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
  font-family: "Open Sans", Helvetica, "Lucida Sans Unicode", "Lucida Grande", Arial, Verdana, sans-serif;
  height: 100%;
  .view_wrap {
    height: calc(100% - (60px + 35px));
  }
}
</style>
