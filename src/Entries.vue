<script setup lang="ts">
import type { Eventy, EventGroup } from "@markwhen/parser";
import { isEvent, iter, toArray } from "@markwhen/parser";
import type { Event } from "@markwhen/parser";
import { computed } from "vue";
import Entry from "./Entry.vue";

const props = defineProps<{ entries: Eventy | undefined }>();

const asArray = computed(() => {
  return ((props.entries && toArray(props.entries)) || []).filter((e) =>
    isEvent(e.eventy)
  );
});
</script>

<template>
  <main class="py-8 bg-white dark:bg-slate-800 w-full flex flex-col gap-6">
    <Entry :entry="entry.eventy as Event" v-for="entry in asArray"></Entry>
  </main>
</template>

<style scoped></style>
