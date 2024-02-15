<script setup lang="ts">
import { ref } from 'vue'
import CreateToDoVue from './components/molecules/CreateToDo.vue'
import ToDoList from './components/organisms/ToDoList.vue'

let toDoList = ref([
  {
    title: 'Faire les courses',
    hours: 2,
    responsible: 'Moi'
  },
  {
    title: 'Faire le ménage',
    hours: 3,
    responsible: "Quelqu'un d'autre"
  }
])

const createToDo = (toDo: { title: string; hours: number; responsible: string }) => {
  toDoList.value.push(toDo)
}

const deleteTodo = (id: number) => {
  toDoList.value.splice(id, 1)
}
</script>

<template>
  <header></header>

  <main>
    <CreateToDoVue :toDoList="toDoList" @create-todo="createToDo" />

    <ToDoList :toDoList="toDoList" @delete-todo="deleteTodo" />
  </main>
</template>

<style scoped></style>
