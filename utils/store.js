import { useLayoutEffect } from "react";
import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

// declare global store
let store;

// set initial state values for form and chart
const initialState = {
  query: {
    symbol: null,
    amount: null,
    date: null,
  },
  details: {
    currentValue: null,
    valueDelta: null,
    percentDelta: null,
  },
  chartData: {
    labels: [],
    indexValues: [],
    assetValues: [],
  },
};

// initialize store access
export const { Provider, useStore } = createContext(initialState);

// initialize store methods
export const initializeStore = (preloadedState = {}) =>
  create(
    persist(
      (set, get) => ({
        ...initialState,
        ...preloadedState,
        storeQuery: ({ query }) => set({ query }),
        storeResults: ({ details, chartData }) => set({ details, chartData }),
      }),
      {
        name: "global-store",
        getStorage: () => sessionStorage,
      }
    )
  );

export const getQuerySelector = (state) => state.query;
export const getDetailsSelector = (state) => state.details;
export const getChartDataSelector = (state) => state.chartData;
export const getChangeSelector = (state) => state.details.valueDelta;

export const setQuerySelector = (state) => state.storeQuery;
export const setResultsSelector = (state) => state.storeResults;

// manage csr v ssr alignment
export const useHydrate = (initialState) => {
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
