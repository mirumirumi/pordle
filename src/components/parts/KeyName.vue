<template>
  <div class="key_name" :class="{ 'exist_card': isExistCard }">
    <div class="key">
      <span>{{ keyName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  keyName: string,
  isExistCard: boolean,
}>()
</script>

<style lang="scss" scoped>
.key_name {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  &.exist_card {
    top: 5px;
    bottom: auto;
  }
  .key {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22.2px;
    padding: 0.05em 0.19em 0.09em;
    border: solid 1.7px #5d5d68;
    border-radius: 4px;
    span {
      color: #5d5d68;
      font-size: 0.888em;
      font-weight: bold;
    }
  }
}
</style>
