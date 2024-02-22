<script setup lang="ts">
import { ref } from "vue";

const sideBarActive = ref(false);

const toggle = () => {
  sideBarActive.value = !sideBarActive.value;
};
</script>
<template>
  <aside
    class="side-bar h-full bg-white shadow-md absolute top-0 w-fit max-w-56 overflow-y-auto flex flex-row items-center justify-center p-4 gap-4 z-[2]"
    :class="{ active: sideBarActive }"
  >
    <div class="content">
      <h2>Side Bar</h2>

      <p class="text-base">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
        excepturi id molestias consectetur voluptatem quisquam ad accusantium in
        non veniam impedit autem explicabo beatae, reiciendis quasi debitis
        aperiam optio eos.
      </p>
    </div>
    <button class="font-bold rounded" @click="toggle">
      {{ sideBarActive ? "<" : ">" }}
    </button>
  </aside>
</template>
