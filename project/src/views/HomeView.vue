<script setup lang="ts">
import BackButton from "@/components/atoms/BackButton.vue";
import Banner from "@/components/organisms/Banner.vue";
import HomeMeals from "@/components/organisms/HomeMeals.vue";
import SideBar from "@/components/organisms/SideBar.vue";
</script>

<template>
  <main class="flex flex-raw flex-nowrap relative">
    <div class="container flex flex-col">
      <BackButton />

      <Banner />

      <HomeMeals class="mt-12" />
    </div>
    <SideBar :right="true" />
  </main>
</template>
