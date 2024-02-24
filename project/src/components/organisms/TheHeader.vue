<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import SearchMealByName from "../molecules/SearchMealByName.vue";

const burgerActive = ref(false);
</script>

<template>
  <header
    class="w-[-webkit-fill-available] sticky top-4 mobile:top-2 m-4 mobile:my-2 bg-white shadow-md rounded-full z-20"
    id="header"
  >
    <RouterLink to="/">
      <img
        alt="Vue logo"
        class="logo m-3 h-[-webkit-fill-available] max-h-10 mobile:max-h-6"
        src="@/assets/logo.svg"
      />
    </RouterLink>

    <SearchMealByName />

    <nav
      class="w-fit text-base mr-4 tablet:mr-0 text-center tablet:rounded-xl tablet:shadow-lg tablet:w-full tablet:p-4 tablet:gap-3 flex justify-end tablet:justify-center"
      :class="{ active: burgerActive }"
    >
      <RouterLink
        class="btn-secondary rounded-full py-1 text-base tablet:text-xl"
        to="/"
        @click="burgerActive = false"
        >Home</RouterLink
      >
      <RouterLink
        class="btn-secondary rounded-full py-1 text-base tablet:text-xl"
        to="/categories"
        @click="burgerActive = false"
        >Categories</RouterLink
      >
      <RouterLink
        class="btn-secondary rounded-full py-1 text-base tablet:text-xl"
        to="/ui-kit"
        @click="burgerActive = false"
        >Ui Kit</RouterLink
      >
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
