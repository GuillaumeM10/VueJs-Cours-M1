import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  function reset() {
    count.value = 0;
  }

  watch(
    () => count.value,
    (value) => {
      localStorage.setItem("count", value.toString());
      value === 0 && localStorage.removeItem("count");
    }
  );

  return {
    count,
    doubleCount,
    increment,
    reset,
  };
});
