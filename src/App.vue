<script setup lang="ts">
import { defineComponent, watch, h, createSSRApp, computed } from "vue";
import { renderToString } from "@vue/server-renderer";
import { useMarkwhenStore } from "./Markwhen/markwhenStore";
import Resume from "./Resume.vue";

const markwhenStore = useMarkwhenStore();

const toHTML = async () => {
  const vueApp = defineComponent({
    render() {
      // @ts-ignore
      return h(Resume, {
        header: markwhenStore.markwhen.parsed.header,
        entries: markwhenStore.markwhen?.transformed,
        dark: markwhenStore.app?.isDark,
      });
    },
  });
  const app = createSSRApp(vueApp);
  const appHtml = await renderToString(app);
  const styles = [];

  for (const s of document.getElementsByTagName("style")) {
    styles.push(`<style>${s.innerHTML}</style>`);
  }

  return `<html>
  <head>
    <title>Resume</title>
    ${styles.join("")}
  </head>
  <body>
    <div id="app">${appHtml}</div>
  </body>
</html>`;
};

const dark = computed(() => markwhenStore.app?.isDark);

const downloadToFile = async () => {
  const a = document.createElement("a");
  const file = new Blob([await toHTML()], {
    type: "text/html",
  });
  a.href = URL.createObjectURL(file);
  a.download = `resume.html`;
  a.click();
  URL.revokeObjectURL(a.href);
};
</script>

<template>
  <div class="w-full h-full flex flex-col" :class="dark ? 'dark' : ''">
    <div
      v-if="!markwhenStore.hadInitialState"
      class="flex flex-row gap-2 items-center py-1 border-b dark:border-slate-800"
    >
      <div class="ml-auto flex flex-row gap-2 mx-2 font-sans">
        <a
          class="underline dark:text-slate-300"
          target="_blank"
          href="https://github.com/kochrt/kochrt.github.io/blob/master/resume.mw"
          >Example syntax</a
        >
        <a
          href="https://robko.ch/resume"
          class="underline dark:text-slate-300"
          target="_blank"
          >Example output (good for printing to PDF)</a
        >
        <button
          class="rounded py-px font-bold px-2 text-slate-100 bg-blue-800"
          @click="downloadToFile"
        >
          Download HTML
        </button>
      </div>
    </div>
    <div class="overflow-scroll w-full h-full bg-white dark:bg-slate-900">
      <Resume
        v-if="markwhenStore.markwhen"
        :header="markwhenStore.markwhen?.parsed?.header"
        :entries="markwhenStore.markwhen?.transformed"
        :dark="!!dark"
      />
    </div>
  </div>
</template>

<style scoped></style>
