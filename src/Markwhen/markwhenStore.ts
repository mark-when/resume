import { defineStore } from "pinia";
import { ref } from "vue";
import produce from "immer";
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
} from "@markwhen/parser/lib/Types";
import {
  type EventPath,
  equivalentPaths,
} from "@markwhen/view-client/dist/paths";

export const useMarkwhenStore = defineStore("markwhen", () => {
  const app = ref<AppState>();
  const markwhen = ref<MarkwhenState>();

  const onJumpToPath = ref((path: EventPath) => {});
  const onJumpToRange = ref((range: DateRangeIso) => {});

  const { postRequest } = useLpc({
    state: (s) => {
      app.value = produce(app.value, () => s.app);
      markwhen.value = produce(markwhen.value, () => s.markwhen);
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

  const requestStateUpdate = () => postRequest("state");
  requestStateUpdate();

  return {
    app,
    markwhen,

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
