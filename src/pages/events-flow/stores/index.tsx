import { createContext, useContext, useState } from "react";
import { eventsFlowStore } from "./useEventsFlowStore";
import useAutoLayout from "@/hooks/useAutoLayout";

type EventFlowContext = {
  store: typeof eventsFlowStore;
  renderLayout: CallableFunction;
};

export const Store = createContext({} as EventFlowContext);

export function useEventsFlowContext() {
  return useContext(Store);
}

export const StoreProvider = (props: any) => {
  const { children } = props;
  const renderLayout = useAutoLayout({ direction: "TB" });

  const params = {
    store: eventsFlowStore,
    renderLayout,
  };

  return <Store.Provider value={params}>{children}</Store.Provider>;
};
