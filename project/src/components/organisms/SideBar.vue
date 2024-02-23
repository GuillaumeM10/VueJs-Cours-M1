<script setup lang="ts">
import { ref } from "vue";
import IconChevronLeft from "../atoms/IconChevronLeft.vue";

defineProps({
  right: Boolean,
});

const sideBarActive = ref(false);

const toggle = () => {
  sideBarActive.value = !sideBarActive.value;
};
</script>
<template>
  <aside
    class="side-bar flex items-center z-[2]"
    :class="{ active: sideBarActive, right: right, left: !right }"
  >
    <div class="side-bar-content bg-[#e0e4e9] h-full">
      <div class="wrapper w-60 p-4 pt-40 min-h-full">
        <slot></slot>
      </div>
    </div>
    <button class="open-btn font-bold bg-[#e0e4e9] py-2 w-4" @click="toggle">
      <IconChevronLeft
        class="open-btn-icon transition-all w-4 scale-105 text-black"
      />
    </button>
  </aside>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
