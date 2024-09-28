import { defineStore } from "pinia";
import { ref } from "vue";
import { produce } from "immer";
import {
  type AppState,
  type DisplayScale,
  type MarkwhenState,
  useLpc,
} from "@markwhen/view-client";
import type {
  DateFormat,
  DateRangeIso,
  DateTimeGranularity,
} from "@markwhen/parser";
import {
  type EventPath,
  equivalentPaths,
} from "@markwhen/view-client/dist/paths";

export const useMarkwhenStore = defineStore("markwhen", () => {
  const app = ref<AppState>();
  const markwhen = ref<MarkwhenState>();

  const onJumpToPath = ref((path: EventPath) => {});
  const onJumpToRange = ref((range: DateRangeIso) => {});

  const hadInitialState = ref(
    // @ts-ignore
    typeof window !== "undefined" && window.__markwhen_initial_state
  );

  const { postRequest } = useLpc({
    markwhenState(s) {
      console.log(s)
      markwhen.value = produce(markwhen.value, () => s);
    },
    appState: (s) => {
      app.value = produce(app.value, () => s);
    },
    jumpToPath: ({ path }) => {
      onJumpToPath.value?.(path);
    },
    jumpToRange: ({ dateRangeIso }) => {
      onJumpToRange.value?.(dateRangeIso);
    },
  });

  const setHoveringPath = (path?: EventPath) => {
    postRequest("setHoveringPath", path);
  };

  const setDetailEventPath = (path?: EventPath) => {
    postRequest("setDetailPath", path);
  };

  const setText = (text: string, at?: { from: number; to: number }) => {
    postRequest("setText", { text, at });
  };

  const showInEditor = (path: EventPath) => {
    postRequest("showInEditor", path);
  };

  const isDetailEventPath = (path: EventPath | undefined) =>
    !!path && equivalentPaths(path, app.value?.detailPath);

  const createEventFromRange = (
    dateRangeIso: DateRangeIso,
    granularity: DateTimeGranularity,
    immediate: boolean = true
  ) => {
    postRequest("newEvent", { dateRangeIso, granularity, immediate });
  };

  const editEventDateRange = (
    path: EventPath,
    dateRangeIso: DateRangeIso,
    scale: DisplayScale,
    preferredInterpolationFormat: DateFormat | undefined
  ) => {
    const params = {
      path,
      range: dateRangeIso,
      scale,
      preferredInterpolationFormat,
    };
    postRequest("editEventDateRange", params);
  };

  const requestStateUpdate = () => postRequest("markwhenState");
  requestStateUpdate();

  return {
    app,
    markwhen,
    hadInitialState,

    onJumpToPath,
    onJumpToRange,

    requestStateUpdate,
    setHoveringPath,
    setDetailEventPath,
    isDetailEventPath,
    setText,
    showInEditor,
    createEventFromRange,
    editEventDateRange,
  };
});
