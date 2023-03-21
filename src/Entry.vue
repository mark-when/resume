<script setup lang="ts">
import type { Event, Image } from "@markwhen/parser/lib/Types";
import type { Node } from "@markwhen/parser/lib/Node";
import { toInnerHtml } from "@markwhen/parser/lib/utilities/html";
import { computed } from "vue";

const props = defineProps<{ entry: Node<Event> }>();

const supplemental = computed(
  () => props.entry.value.eventDescription.supplemental
);
const image = computed(
  () => supplemental.value.find((s) => s.type === "image") as Image | undefined
);
const location = computed(
  () => props.entry.value.eventDescription.locations?.[0]
);
const items = computed(() =>
  supplemental.value.filter((s) => s.type === "listItem")
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-3 items-center">
      <img
        v-if="image"
        :src="image.link"
        :alt="image.altText"
        class="rounded h-8 w-8"
      />
      <div class="h-8 w-8 flex-shrink-0" v-else></div>
      <div class="flex flex-col justify-center w-full">
        <div class="flex flex-row">
          <h1
            class="font-semibold text-slate-800 dark:text-slate-200"
            v-if="!entry.value.eventDescription.eventDescription"
          >
            [title]
          </h1>
          <h1
            class="font-semibold text-slate-800 dark:text-slate-200"
            v-html="toInnerHtml(entry.value.eventDescription.eventDescription)"
          ></h1>
          <h2 class="ml-auto text-sm text-slate-500 dark:text-slate-400">
            {{ entry.value.dateText }}
          </h2>
        </div>
        <div class="flex flex-row gap-1">
          <h2
            class="text-sm dark:text-slate-300"
            v-if="supplemental[0]"
            v-html="toInnerHtml(supplemental[0].raw)"
          ></h2>
          <h2 class="text-sm text-slate-500 dark:text-slate-400" v-if="location">·</h2>
          <h2 class="text-sm text-slate-500 dark:text-slate-400" v-if="location">{{ location }}</h2>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-3">
      <div class="h-8 w-8 flex-shrink-0"></div>
      <div class="flex flex-col gap-1 dark:text-slate-300">
        <p
          class=""
          v-for="item in items"
          v-html="toInnerHtml(item.raw)"
          style="font-size: 95%"
        ></p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
