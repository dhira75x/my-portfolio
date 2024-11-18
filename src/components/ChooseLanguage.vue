<script setup>
import { useMainStore } from "../stores/mainStore.js";

const mainStore = useMainStore();

const onChange = (e) => {
  mainStore.language = e.target.value;
};

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "kr", label: "Korean" },
];
</script>

<template>
  <div>
    <label>
      First, please select your language.
      <select :value="mainStore.language" @change="onChange">
        <option v-for="l in LANGUAGES" :value="l.value" :key="l.value">
          {{ l.label }}
        </option>
      </select>
    </label>
  </div>
</template>
