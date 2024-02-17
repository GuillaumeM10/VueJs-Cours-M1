<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { RouterLink } from "vue-router";

const count = useCounterStore();
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <button @click="count.increment()">
        Clicked {{ count.count }} times
      </button>

      <button @click="count.reset()">Reset</button>
    </div>
  </header>
</template>
