<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Main from "./Main.vue"
const props = defineProps<{ header: any, entries: any }>();

</script>

<template>
  <div class="mx-auto font-sans flex flex-row" style="width: 80rem">
    <Sidebar :header="header" />
    <Main></Main>
  </div>
</template>

<style scoped></style>
