<script setup lang="ts">
import BackButtonVue from "@/components/atoms/BackButton.vue";
import Banner from "@/components/organisms/Banner.vue";
import MealsList from "@/components/organisms/MealsList.vue";
import SideBar from "@/components/organisms/SideBar.vue";

import MealService from "@/services/MealService";

import type { MealsType, MealType } from "@/types/mealTypes";

import { reactive, ref } from "vue";

import VueMultiselect from "vue-multiselect";

import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";

import { register } from "swiper/element/bundle";
import IconChevronLeft from "@/components/atoms/IconChevronLeft.vue";
register();

let meals = reactive<MealsType>([]);
const selectValue = ref<any>(null);
const sectionOptions = [
  { name: "Vue.js" },
  { name: "Rails" },
  { name: "Sinatra" },
  { name: "Laravel" },
  { name: "Phoenix" },
];

const getMeal = async () => {
  try {
    const getRandomMeal = (await MealService.randomMeal()) as MealType;
    meals.push(getRandomMeal);
  } catch (error) {
    console.error(error);
  }
};

for (let index = 0; index < 4; index++) {
  getMeal();
}

const notify = () => {
  toast("toast", {
    autoClose: 1000,
    type: "info",
    position: "top-center",
    dangerouslyHTMLString: true,
  }); // ToastOptions
};

const spaceBetween = 10;
const onProgress = (e: any) => {
  const [swiper, progress] = e.detail;
  console.log(progress);
};

const onSlideChange = (e: any) => {
  console.log("slide changed");
};
</script>

<template>
  <main>
    <BackButtonVue class="p-4" />
    <Banner class="p-4" />

    <section class="my-12 w-full">
      <h2 class="px-4">swiper</h2>

      <swiper-container
        :slides-per-view="1.3"
        :space-between="spaceBetween"
        :breakpoints="{
          768: {
            slidesPerView: 2.3,
          },
          1024: {
            slidesPerView: 3.3,
          },
        }"
        @swiperprogress="onProgress"
        @swiperslidechange="onSlideChange"
        class="my-4 w-[-webkit-fill-available]"
      >
        <swiper-slide>
          <p
            class="cursor-grab min-h-14 bg-black text-white text-center p-8 rounded-full ml-4"
          >
            Slide 1
          </p>
        </swiper-slide>
        <swiper-slide>
          <p
            class="cursor-grab min-h-14 bg-black text-white text-center p-8 rounded-full"
          >
            Slide 2
          </p>
        </swiper-slide>
        <swiper-slide>
          <p
            class="cursor-grab min-h-14 bg-black text-white text-center p-8 rounded-full"
          >
            Slide 3
          </p>
        </swiper-slide>
        <swiper-slide>
          <p
            class="cursor-grab min-h-14 bg-black text-white text-center p-8 rounded-full"
          >
            Slide 4
          </p>
        </swiper-slide>
        <swiper-slide>
          <p
            class="cursor-grab min-h-14 bg-black text-white text-center p-8 rounded-full"
          >
            Slide 5
          </p>
        </swiper-slide>
        <swiper-slide>
          <p
            class="cursor-grab min-h-14 bg-black text-white text-center p-8 rounded-full mr-4"
          >
            Slide 6
          </p>
        </swiper-slide>
      </swiper-container>
    </section>

    <section class="flex flex-row flex-nowrap relative">
      <SideBar :right="false" />
      <div class="container flex flex-col">
        <h1>Ui Kit</h1>

        <MealsList
          v-if="meals.length > 0"
          :meals="(meals as MealsType)"
          class="my-auto"
        />
      </div>
      <SideBar :right="true">
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
      </SideBar>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.swiper.swiper-initialized {
  overflow: visible;
}
</style>
