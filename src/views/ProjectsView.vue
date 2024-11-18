<script setup>
import ProjectCard from '../components/ProjectCard.vue'
import { useMainStore } from '../stores/mainStore.js'

const mainStore = useMainStore()

const projects = mainStore.projects
const language = mainStore.language
</script>

<template>
  <div>
    <h1 class="main-title">My Projects</h1>
    <div class="flex flex-col gap-y-8 items-center">
      <ProjectCard v-for="project in projects" :key="project.id" 
      :project="project" :language="language" />
    </div>
  </div>
</template>
