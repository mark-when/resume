<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Entries from "./Entries.vue";
import type { Node, NodeArray } from "@markwhen/parser/lib/Node";
const props = defineProps<{ header: any; entries: Node<NodeArray>, dark: boolean }>();
</script>

<template>
  <div
    class="mx-auto font-sans flex flex-row resume"
    :class="dark ? 'dark' : ''"
  >
    <Sidebar :header="header" />
    <Entries :entries="entries"></Entries>
  </div>
</template>

<style scoped>
.resume {
  display: grid;
  grid-template-columns: 16rem auto;
}
</style>
