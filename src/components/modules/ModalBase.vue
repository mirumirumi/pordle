<template>
  <div class="modal_base">
    <slot>
    </slot>
    <SvgIcon icon="close" color="#e6e6e6" @click="closeModal" />
    <teleport to="body">
      <ModalBack @click="closeModal" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue"
import SvgIcon from "../parts/SvgIcon.vue"
import ModalBack from "@/components/parts/ModalBack.vue"

const emit = defineEmits<{
  (e: "closeModal"): void,
}>()

const closeModal = () => {
  emit("closeModal")
}

function keydownEscape(e: KeyboardEvent): void {
  if (e.key === "Escape") {
    e.preventDefault()
    closeModal()
  }
}

document.addEventListener("keydown", keydownEscape)

onUnmounted(() => {
  document.removeEventListener("keydown", keydownEscape)
})
</script>

<style lang="scss" scoped>
.modal_base {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  margin: auto;
  width: 95%;
  max-width: 555px;
  height: 55%;
  max-height: 444px;
  background-color: $background;
  box-shadow: 0 5px 20px rgba($background, 0.666);
  border-radius: 7px;
  z-index: 2;
  svg {
    top: 15px;
    right: 25px;
    bottom: auto;
    cursor: pointer;
  }
}
</style>
