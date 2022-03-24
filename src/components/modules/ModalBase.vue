<template>
  <div class="modal_base" id="modal_base" @click="clickedToCloseModal($event)">
    <div class="modal" id="modal_body" :class="className">
      <slot></slot>
      <SvgIcon icon="close" color="#e6e6e6" @click="closeModal" />
    </div>
    <teleport to="body">
      <ModalBack />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue"
import SvgIcon from "../parts/SvgIcon.vue"
import ModalBack from "@/components/parts/ModalBack.vue"

defineProps<{
  className: string,
}>()

const emit = defineEmits<{
  (e: "closeModal"): void,
}>()

const clickedToCloseModal = (e: any = null) => {  // eslint-disable-line
  if (e.target.id === "modal_body")
    return

  let isModalChild = false
  let parent = e.target.parentElement
  while (parent) {
    if (parent.id === "modal_body") {
      isModalChild = true
      break
    }
    parent = parent.parentElement
  }

  if (isModalChild)
    return

  closeModal()
}

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
  inset: 0;
  display: flex;
  z-index: 2;
  .modal {
    margin: auto;
    position: relative;
    width: 95%;
    max-width: 555px;
    padding-top: 2.3em;
    padding-bottom: 2.3em;
    color: $text;
    background-color: $background;
    box-shadow: 0 5px 20px rgba($background, 0.666);
    border-radius: 7px;
    svg {
      top: 10px;
      right: 19px;
      bottom: auto;
      cursor: pointer;
    }
  }
}
</style>
