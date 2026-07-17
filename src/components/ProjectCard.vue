<script setup>
import { ref } from 'vue'
import { ChevronDownIcon, ChevronUpIcon, CodeBracketIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'

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
  <div class="relative overflow-hidden transition-all duration-300 border border-gray-100 shadow-lg group rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:-translate-y-1">
    <!-- Card Header -->
    <div class="relative p-6 pb-4">
      <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-50 bg-gradient-to-br from-amber-100 to-amber-50"></div>
      <h2 class="relative text-2xl font-bold tracking-tight text-gray-800">{{ project.name }}</h2>
      
      <div class="relative mt-4">
        <p class="leading-relaxed text-gray-600">
          {{ language === 'en' ? project.description.en : project.description.fr }}
        </p>
      </div>
    </div>
    
    <!-- Expandable Content -->
    <div 
      class="overflow-hidden transition-all duration-500 ease-in-out"
      :class="discover ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="px-6 pb-4">
        <div class="pt-4 border-t border-gray-100">
          <h3 class="flex items-center mb-3 text-lg font-semibold text-gray-800">
            <CodeBracketIcon class="w-5 h-5 mr-2 text-amber-600" />
            Technologies
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="t in project.technologies" 
              :key="t" 
              class="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 rounded-full text-sm font-medium shadow-sm"
            >
              {{ t }}
            </span>
          </div>
        </div>
        
        <div class="flex flex-col gap-3 mt-6 sm:flex-row">
          <a 
            :href="project.githubUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg font-medium transition-all duration-300 hover:from-gray-700 hover:to-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            <CodeBracketIcon class="w-5 h-5" />
            <span>View on GitHub</span>
            <ArrowTopRightOnSquareIcon class="w-4 h-4 opacity-70" />
          </a>
          
          <a 
            v-if="project?.website"
            :href="project.website" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <GlobeAltIcon class="w-5 h-5" />
            <span>Visit Website</span>
            <ArrowTopRightOnSquareIcon class="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Card Footer -->
    <div class="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
      <button 
        @click="discover = !discover" 
        class="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-amber-700 font-medium rounded-lg transition-all duration-300 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        <span>{{ discover ? 'Show Less' : 'Discover More' }}</span>
        <component :is="discover ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5 transition-transform duration-300" />
      </button>
    </div>
  </div>
</template>