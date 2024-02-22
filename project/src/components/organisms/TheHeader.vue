<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const burgerActive = ref(false);
</script>

<template>
  <header
    class="w-[-webkit-fill-available] sticky top-4 m-4 bg-white shadow-md rounded-full"
  >
    <RouterLink to="/">
      <img
        alt="Vue logo"
        class="logo m-3 h-[-webkit-fill-available] max-h-10"
        src="@/assets/logo.svg"
      />
    </RouterLink>

    <nav
      class="w-fit text-base mr-4 text-center mobile:rounded-xl mobile:shadow-lg mobile:w-full mobile:p-4 mobile:gap-3"
      :class="{ active: burgerActive }"
    >
      <RouterLink class="rounded-xl" to="/">Home</RouterLink>
      <RouterLink class="rounded-xl" to="/about">About</RouterLink>
      <RouterLink class="rounded-xl" to="/ui-kit">Ui Kit</RouterLink>
    </nav>

    <div class="burger-container mr-4">
      <button
        class="burger"
        :class="{ active: burgerActive }"
        @click="burgerActive = !burgerActive"
      >
        <span class="burger-bar-1"></span>
        <span class="burger-bar-2"></span>
        <span class="burger-bar-3"></span>
      </button>
    </div>
  </header>
</template>
