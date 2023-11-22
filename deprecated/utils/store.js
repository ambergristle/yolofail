import { useLayoutEffect } from "react";
import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

// declare global store
let store;

// set initial state values for form and chart
// set loading and sentFeedback trackers to false
const initialState = {
  loading: false,
  systemError: { error: false, message: "" },
  sentFeedback: false,
  query: {
    symbol: "GME",
    amount: 100,
    date: new Date(),
  },
  details: {
    currentValue: 100,
    valueDelta: 0,
    percentDelta: 0,
  },
  chartData: {
    labels: [],
    indexValues: [],
    assetValues: [],
  },
};

// initialize store access
export const { Provider, useStore } = createContext(initialState);

// initialize store content and methods, specify storage location (session or local)
export const initializeStore = (preloadedState = {}) =>
  create(
    persist(
      (set, get) => ({
        ...initialState,
        ...preloadedState,
        setQuery: (query) => set({ query }),
        setResults: ({ details, chartData }) => set({ details, chartData }),
        toggleLoading: () => set(({ loading }) => ({ loading: !loading })),
        setSystemError: (message) =>
          set({
            systemError: { error: true, message },
          }),
        resetSystemError: () => set({ systemError: initialState.systemError }),
        setSentFeedback: () => set({ sentFeedback: true }),
      }),
      {
        name: "global-store",
        getStorage: () => sessionStorage,
      }
    )
  );

// memoize selectors
export const setSystemError = (state) => state.setSystemError;

export const queryFormSelectors = {
  toggleLoading: (state) => state.toggleLoading,
  systemError: (state) => [state.setSystemError, state.resetSystemError],
  resetSystemError: (state) => state.resetSystemError,
  getQuery: (state) => state.query,
  setQuery: (state) => state.setQuery,
  setResults: (state) => state.setResults,
};

export const chartDetailsSelectors = {
  getSystemError: (state) => state.systemError,
  getDetails: (state) => state.details,
};

export const valueChartSelectors = {
  getSystemError: (state) => state.systemError,
  getLoading: (state) => state.loading,
  getChartData: (state) => state.chartData,
  getChange: (state) => state.details.valueDelta,
};

export const getSentFeedbackSelector = (state) => state.sentFeedback;
export const setSentFeedbackSelector = (state) => state.setSentFeedback;

// manage csr v ssr store use
export const useHydrate = (initialState) => {
  // initialize new store if none (when ssr)
  const _store = store ?? initializeStore(initialState);

  // use new store for ssr, reuse store for csr
  if (typeof window !== "undefined") {
    if (!store) store = _store;

    // if initialState changes, merge states, keeping client/server in sync
    // ignore eslint as code runs in same order in each environment
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (initialState && store) {
        store.setState({
          ...store.getState(),
          ...initialState,
        });
      }
    }, [initialState]);
  }

  return _store;
};
