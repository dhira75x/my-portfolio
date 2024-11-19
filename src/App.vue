<script setup>
import { RouterLink, RouterView } from "vue-router";
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <div class="centered">
    <nav class="nav-menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/my-skills">Skills</RouterLink>
    </nav>
  </div>

  <RouterView class="mx-16" v-slot="{ Component }">
    <Transition name="fade">
      <Component :is="Component" />
    </Transition>
  </RouterView>

  <footer
    class="w-full bg-slate-900 mt-10 border-t-2 pt-14 hover:border-t-amber-500 hover:bg-transparent duration-200"
  >
    <div class="centered gap-x-16">
      <!-- github -->
      <a
        href="https://github.com/dhira75x"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/github.svg" alt="My github account" />
      </a>

      <!-- linkedin -->
      <a
        href="www.linkedin.com/in/farida-francisca-abdul-85b4841a1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/linkedin.svg" alt="My linkedin account" />
      </a>

      <!-- stackoverflow -->
      <a
        href="https://stackoverflow.com/users/27508505/phareedah-abdul"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./assets/stackoverflow.svg" alt="My stackoverflow account" />
      </a>
    </div>

    <!-- copyright -->
    <p class="mt-14 text-center text-sm">
      &copy; {{ currentYear }} Abdul Farida Francisca
    </p>
  </footer>
</template>

<style scoped>
::v-deep(.fade-enter-active, .fade-leave-active) {
  transition: opacity 0.6s ease;
}
::v-deep(.fade-enter-from, .fade-leave-to) {
  opacity: 0;
}
</style>
mn kkl,ml;,kk[pl';]
