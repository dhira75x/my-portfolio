<script setup>
import { ref } from 'vue'

const discover = ref(false)

defineProps({
  project: {
    type: Object,
    required: true
  },
  language: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <h2 class="card-title">{{ project.name }}</h2>

    <p v-if="language === 'en'" class="card-text">{{ project.description.en }}</p>
    <p v-else>{{ project.description.fr }}</p>

    <div v-show="discover">
      <h3 class="text-lg my-4">Technologies</h3>
      <div class="flex flex-wrap gap-2">
        <span class="tag bg-rose-600" v-for="t in project.technologies" :key="t.id">
          {{ t }}
        </span>
      </div>
      <div class="flex flex-row">
        <!-- noopener noreferrer, for security reasons. -->
        <a class="btn btn-amber mt-4 mr-4" role="button" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        <a v-if="project?.website" class="btn btn-amber mt-4" role="button" :href="project?.website" target="_blank" rel="noopener noreferrer">Website</a>
      </div>
    </div>

    <button @click="discover = !discover" class="btn btn-amber mt-4">{{ (discover) ? 'Less' : 'More' }}</button>
  </div>
</template>
