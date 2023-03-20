<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ header: any }>();

const addHttpIfNeeded = (link: string) => {
  if (link.startsWith("http")) {
    return link;
  }
  return `http://${link}`;
};

const websiteLink = computed(() =>
  addHttpIfNeeded(props.header?.contact?.website || "http://example.com")
);

const linkedInLink = computed(() =>
  addHttpIfNeeded(props.header?.contact?.linkedIn || "https://linkedin.com")
);

const githubLink = computed(() =>
  addHttpIfNeeded(props.header?.contact?.github || "github.com")
);
</script>

<template>
  <div class="sidebar flex flex-col w-60">
    <div
      class="flex flex-col items-center justify-center py-6 px-2 gap-1 text-slate-900 bg-slate-200"
    >
      <h1 class="text-3xl font-black">
        {{ header.title || "[header.title]" }}
      </h1>
      <h2 class="text-lg font-bold text-center">
        {{ header.description || "[header.description]" }}
      </h2>
    </div>
    <div class="flex flex-col px-4 gap-10 py-6 bg-slate-100 text-slate-700">
      <div class="flex flex-col gap-2">
        <a :href="`mailto:${header.contact?.email || 'example@example.com'}`">
          <h4 class="flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {{ header.contact?.email || "[header.contact.email]" }}
          </h4>
        </a>
        <a :href="websiteLink">
          <h4 class="flex flex-row items-center gap-1 underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            {{ header.contact?.website || "[header.contact.website]" }}
          </h4>
        </a>
        <a :href="linkedInLink">
          <h4 class="flex flex-row items-center gap-1 underline">
            <svg
              class="w-4 h-4"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
              ></path>
            </svg>

            {{ header.contact?.linkedIn || "[header.contact.linkedIn]" }}
          </h4>
        </a>
        <a :href="githubLink">
          <h4 class="flex flex-row items-center gap-1 underline">
            <svg
              class="w-4 h-4"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
              ></path>
            </svg>
            {{ header.contact?.github || "[header.contact.github]" }}
          </h4>
        </a>
      </div>
      <pre v-if="!header.sidebar" class="text-sm">
sidebar:
- name: education
items: 
  - 
    - BS in Computer Science
    - Yale
  -
    - PhD in Computer Science
    - Harvard
    </pre
      >
      <div class="flex flex-col gap-2" v-for="section in header.sidebar">
        <h4 class="text-sm text-slate-500 uppercase">{{ section.name }}</h4>
        <div class="" v-for="item in section.items">
          <template v-if="Array.isArray(item)">
            <h5 :class="item.length === 2 ? `font-medium` : ''">
              {{ item[0] }}
            </h5>
            <h6 class v-if="item[1]">
              {{ item[1] }}
            </h6>
          </template>
          <h5 v-else class="text-sm">
            {{ item }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
