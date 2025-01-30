<script setup>
import { useMainStore } from "../stores/mainStore";

const mainStore = useMainStore();
const skills = mainStore.skills;
const language = mainStore.language;
</script>

<template>
  <div class="container">
    <h1 class="main-title">My skills</h1>

    <h2 class="sub-title">* Hard Skills *</h2>

    <h3 class="text-xl mb-4">Technologies</h3>
    <p class="text-justify" v-if="language === 'en'">
      Throughout my personal projects, I have employed a range of programming
      languages and technologies to bring my visions to fruition. These
      encompass TypeScript, JavaScript, PHP, C language, Python, and Java. I
      have also utilized popular frameworks such as React, Vue.js, and Symfony
      to enhance my projects and streamline my workflow. These robust tools have
      enabled me to create a variety of projects, from interactive web
      applications to high-performing Back-End systems. My expertise with these
      technologies has allowed me to develop projects that are both functional
      and visually appealing, and I'm always eager to expand my knowledge and
      explore new technologies that will allow me to create even better projects
      in the future.
    </p>
    <p class="text-justify" v-else-if="language === 'fr'">
      Dans le cadre de mes projets personnels, j'ai utilisé toute une série de
      langages de programmation et de technologies pour concrétiser mes visions.
      Ces langages comprennent TypeScript, JavaScript, PHP, le langage C, Python
      et Java. J'ai également utilisé des frameworks web populaires tels que
      React, Vue.js et Symfony afin de mieux structurer mes projets. Ces outils
      robustes m'ont permis de créer une grande variété de projets, des
      applications web interactives aux systèmes Back-End performants. Mon
      expertise de ces technologies m'a permis de développer des projets à la
      fois fonctionnels et visuellement attrayants, et je suis toujours prêt à
      élargir mes connaissances et à explorer de nouvelles technologies qui me
      permettront de créer des projets encore meilleurs à l'avenir.
    </p>
    <p class="text-justify" v-else>
      gaein peulojegteu jeonban-e geolchyeo jeoneun dayanghan bangbeob-eul
      sayonghaessseubnida. nae bijeon-eul silhyeonhal peulogeulaeming eon-eowa
      gisul gyeolsil-eul maejda. yeogieneun TypeScript, JavaScript, PHP, Cga
      pohamdoebnida. eon-eo, Python mich Java. ingido manh-i hwal-yonghaess-eoyo
      React, Vue.js, Symfonywa gat-eun peuleim-wokeuleul tonghae nae
      peulojegteuleul jinhaenghago jag-eob heuleum-eul gansohwahal su
      issseubnida. ileohan ganglyeoghan dogu dayanghan peulojegteuleul mandeul
      su issge doeeoss-eoyo. goseongneung baeg-endeue daehan daehwahyeong web
      aepeullikeisyeon siseutem. ileohan gisul-e daehan naui jeonmun jisig-eun
      naneun gineungjeog-igo sigagjeog-in peulojegteuleul gaebalhago
      sipseubnida. naneun hangsang nae jisig-eul hwagjanghago sip-eohamyeo naega
      mandeul su issneun saeloun gisul-eul tamsaeghae boseyo. ap-eulo deo
      joh-eun peulojegteu.
    </p>
    <div class="custom-grid">
      <div
        v-for="s in skills.hardSkills.technologies"
        :key="s.name"
        class="skill-card"
      >
        <img
          class="mx-auto w-1/4"
          :src="`./svg/${s.fileName}`"
          :alt="`${s.name} logo`"
        />
        <p class="text-center text-lg mt-4">{{ s.name }}</p>
      </div>
    </div>

    <h3 class="text-xl">Web Frameworks</h3>
    <div class="custom-grid">
      <div
        v-for="s in skills.hardSkills.webFrameworks"
        :key="s.name"
        class="skill-card"
      >
        <img
          class="mx-auto w-1/4"
          :src="`./svg/${s.fileName}`"
          :alt="`${s.name} logo`"
        />
        <p class="text-center text-lg mt-4">{{ s.name }}</p>
      </div>
    </div>

    <h3 class="text-xl">Database Management System</h3>
    <div class="custom-grid">
      <div v-for="s in skills.hardSkills.DBMS" :key="s.name" class="skill-card">
        <img
          class="mx-auto w-1/4"
          :src="`./svg/${s.fileName}`"
          :alt="`${s.name} logo`"
        />
        <p class="text-center text-lg mt-4">{{ s.name }}</p>
      </div>
    </div>

    <h3 class="text-xl">CSS Frameworks</h3>
    <div class="custom-grid">
      <div
        v-for="s in skills.hardSkills.cssFrameworks"
        :key="s.name"
        class="skill-card"
      >
        <img
          class="mx-auto w-1/4"
          :src="`./svg/${s.fileName}`"
          :alt="`${s.name} logo`"
        />
        <p class="text-center text-lg mt-4">{{ s.name }}</p>
      </div>
    </div>

    <h3 class="text-xl">UI/UX</h3>
    <div class="custom-grid">
      <div v-for="s in skills.hardSkills.ui" :key="s.name" class="skill-card">
        <img
          class="mx-auto w-1/4"
          :src="`./svg/${s.fileName}`"
          :alt="`${s.name} logo`"
        />
        <p class="text-center text-lg mt-4">{{ s.name }}</p>
      </div>
    </div>

    <h2 class="sub-title">* Soft Skills *</h2>
    <div class="custom-grid">
      <div
        v-for="s in skills.softSkills"
        :key="s.name"
        class="hover:-translate-y-2 bg-indigo-600 py-8 rounded-lg duration-200"
      >
        <div class="flex flex-col items-center gap-y-4 mx-4">
          <img class="w-9/12" :src="`./svg/${s.fileName}`" :alt="s.name" />
          <p class="text-center text-lg font-bold">{{ s.name }}</p>
          <p v-if="language === 'en'">{{ s.description.en }}</p>
          <p v-else>{{ s.description.fr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  @apply rounded-lg py-8 bg-slate-900 hover:text-rose-600 duration-200;
}

.custom-grid {
  @apply grid grid-cols-4 gap-4 my-8;
}
</style>
