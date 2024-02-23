<script setup lang="ts">
import { ref } from "vue";
import IconChevronLeft from "../atoms/IconChevronLeft.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueMultiselect from "vue-multiselect";

defineProps({
  right: Boolean,
});

const sideBarActive = ref(false);
const selectValue = ref<any>(null);
const sectionOptions = [
  { name: "Vue.js" },
  { name: "Rails" },
  { name: "Sinatra" },
  { name: "Laravel" },
  { name: "Phoenix" },
];

const toggle = () => {
  sideBarActive.value = !sideBarActive.value;
};

const notify = () => {
  toast("toast", {
    autoClose: 1000,
    type: "info",
    position: "top-center",
    dangerouslyHTMLString: true,
  }); // ToastOptions
};
</script>
<template>
  <aside
    class="side-bar flex items-center z-[2]"
    :class="{ active: sideBarActive, right: right, left: !right }"
  >
    <div class="side-bar-content bg-[#e0e4e9] h-full">
      <div class="wrapper w-60 p-4 pt-40 min-h-full">
        <h2 class="text-black">Side Bar</h2>

        <button class="text-base btn-primary" @click="notify">toast</button>

        <VueMultiselect
          v-model="selectValue"
          :options="sectionOptions"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="name"
          track-by="name"
        />

        <p class="text-black">{{ selectValue?.name }}</p>
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
