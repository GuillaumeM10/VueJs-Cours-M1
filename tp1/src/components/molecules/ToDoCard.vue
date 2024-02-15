<script setup lang="ts">
defineProps<{
  title: string
  hours: number
  responsible: string
}>()
</script>

<template>
  <div class="to-do-card">
    <h3>
      {{ title }}
    </h3>
    <p class="heures">{{ hours }} heure{{ hours > 1 ? 's' : '' }}</p>
    <p class="responsable">{{ responsible }}</p>
  </div>
</template>

<style scoped>
.to-do-card {
  border: 1px solid #000;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 200px;
}
</style>
