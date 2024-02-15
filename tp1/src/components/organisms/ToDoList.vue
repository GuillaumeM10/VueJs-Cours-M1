<script setup lang="ts">
import ToDoCard from '../molecules/ToDoCard.vue'

defineProps<{
  toDoList: Array<{ title: string; hours: number; responsible: string }>
}>()
</script>

<template>
  <section class="to-do-list">
    <h2>To do liste</h2>

    <ToDoCard
      v-for="toDo in toDoList"
      :key="toDo.title"
      :title="toDo.title"
      :hours="toDo.hours"
      :responsible="toDo.responsible"
    />
  </section>
</template>

<style scoped>
.to-do-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
