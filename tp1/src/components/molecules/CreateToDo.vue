<script setup lang="ts">
defineProps<{
  toDoList: Array<{ title: string; hours: number; responsible: string }>
}>()

// const createToDo = (e: Event) => {
//   e.preventDefault()

//   const title = (document.getElementById('title') as HTMLInputElement).value
//   const hours = (document.getElementById('hours') as HTMLInputElement).value
//   const responsible = (document.getElementById('responsible') as HTMLInputElement).value

//   console.log({ title, hours, responsible })

//   toDoList.value.push({ title, hours: Number(hours), responsible })
// }
</script>

<template>
  {{/*
  <form @submit="createToDo" class="create-to-do">
    <h2>Créer une nouvelle tâche</h2>

    <label for="title">Titre</label>
    <input type="text" id="title" />

    <label for="hours">Heures</label>
    <input type="number" id="hours" />

    <label for="responsible">Responsable</label>
    <select id="responsible">
      <option value="Moi">Moi</option>
      <option value="Quelqu'un d'autre">Quelqu'un d'autre</option>
    </select>

    <button type="submit">Créer</button>
  </form>
  */}}
</template>

<style scoped></style>
