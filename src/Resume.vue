<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Entries from "./Entries.vue";
import type { EventGroup } from "@markwhen/parser";
const props = defineProps<{
  header: any;
  entries: EventGroup | undefined;
  dark: boolean;
}>();
</script>

<template>
  <div
    class="font-sans flex flex-row resume gap-4 mx-8"
    :class="dark ? 'dark' : ''"
  >
    <Sidebar :header="header" />
    <Entries :entries="entries"></Entries>
  </div>
</template>

<style scoped>
.resume {
  display: grid;
  grid-template-columns: 14rem auto;
}
</style>
