<script setup lang="ts">
import ToDoCard from '../molecules/ToDoCard.vue'

const props = defineProps<{
  toDoList: Array<{ title: string; hours: number; responsible: string }>
}>()

let filteredToDo: Array<{ title: string; hours: number; responsible: string }> | null = null

const filterToDo = (e: Event) => {
  e.preventDefault()
  const responsible = (document.getElementById('responsible') as HTMLSelectElement).value
  if (responsible === 'Moi') {
    filteredToDo = props.toDoList.filter((toDo) => toDo.responsible === 'Moi')
  } else {
    filteredToDo = props.toDoList.filter((toDo) => toDo.responsible === "Quelqu'un d'autre")
  }
}

const emit = defineEmits(['delete-todo'])

const deleteToDo = (id: number) => {
  emit('delete-todo', id)
}
</script>

<template>
  <section>
    <h3>Filtres</h3>

    <form class="filter-to-do">
      <label for="responsible">Responsable</label>
      <select id="responsible" @change="filterToDo">
        <option value="Moi">Moi</option>
        <option value="Quelqu'un d'autre">Quelqu'un d'autre</option>
      </select>
    </form>
  </section>

  <section class="to-do-list">
    <h2>To do liste</h2>

    <ToDoCard
      v-for="(toDo, index) in toDoList"
      :key="toDo.title"
      :title="toDo.title"
      :hours="toDo.hours"
      :responsible="toDo.responsible"
      :id="index"
      @delete-todo="deleteToDo"
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
