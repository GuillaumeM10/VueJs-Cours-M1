<script setup lang="ts">
const props = defineProps<{
  toDoList: Array<{ title: string; hours: number; responsible: string }>
}>()
const emit = defineEmits(['create-todo'])

function checkError() {
  let title = (document.getElementById('title') as HTMLInputElement).value
  let hours = (document.getElementById('hours') as HTMLInputElement).value
  let responsible = (document.getElementById('responsible') as HTMLInputElement).value
  let error = false
  let errorMessage = ''
  if (title == '' || hours == '' || responsible == '') {
    error = true
    errorMessage = 'Un des champs est vide'
  }
  if (isNaN(Number(hours))) {
    error = true
    errorMessage = "Le nombre d'heures n'est pas un nombre"
  }
  let responsibleTasks = props.toDoList.filter((task) => task.responsible == responsible)
  let responsibleHours = 0
  responsibleTasks.forEach((task) => {
    responsibleHours += task.hours
  })
  if (responsibleTasks.length >= 3 || responsibleHours + Number(hours) > 10) {
    error = true
    errorMessage =
      "Le responsable a deja au moins 3 taches en cours ou la somme du nombre d'heures de ses taches depasse 10"
  }
  if (error) {
    alert(errorMessage)
    return false
  } else {
    return true
  }
}

const createToDo = (e: Event) => {
  e.preventDefault()

  const title = (document.getElementById('title') as HTMLInputElement).value
  const hours = (document.getElementById('hours') as HTMLInputElement).value
  const responsible = (document.getElementById('responsible') as HTMLInputElement).value

  if (!checkError()) return

  emit('create-todo', { title, hours: Number(hours), responsible })
}
</script>

<template>
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
</template>

<style scoped></style>
