<script setup lang="ts">
import type { Node, NodeArray } from "@markwhen/parser/lib/Node";
import { isEventNode, walk } from "@markwhen/parser/lib/Noder";
import type { Event } from "@markwhen/parser/lib/Types";
import { computed } from "vue";
import Entry from "./Entry.vue";

const props = defineProps<{ entries: Node<NodeArray> | undefined }>();

const asArray = computed(() => {
  const items: Node<Event>[] = [];
  walk(props.entries, [], (node, path) => {
    if (node && isEventNode(node)) {
      items.push(node);
    }
  });
  return items;
});
</script>

<template>
  <main
    class="py-8 bg-white dark:bg-slate-800 w-full flex flex-col gap-6"
  >
    <Entry :entry="entry" v-for="entry in asArray"></Entry>
  </main>
</template>

<style scoped></style>
