<script setup lang="ts">
import { defineComponent, watch, h, createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { useMarkwhenStore } from "./Markwhen/markwhenStore";
import Resume from "./Resume.vue";

const markwhenStore = useMarkwhenStore();

const toHTML = async () => {
  const vueApp = defineComponent({
    render() {
      return h(Resume, {
        header: markwhenStore.markwhen?.page.parsed?.header,
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
    ${styles}
  </head>
  <body>
    <div id="app">${appHtml}</div>
  </body>
</html>`;
};

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
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-row gap-2 items-center justify-center py-1 border-b">
      <button class="rounded py-px font-bold px-2 text-slate-100 bg-blue-800" @click="downloadToFile">
        Download HTML
      </button>
    </div>
    <div class="overflow-scroll w-full h-full">
      <Resume
        v-if="markwhenStore.markwhen"
        :header="markwhenStore.markwhen?.page.parsed?.header"
      />
    </div>
  </div>
</template>

<style scoped></style>
