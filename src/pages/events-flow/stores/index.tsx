import { createContext, useContext } from "react";
import { eventsFlowStore } from "./useEventsFlowStore";
import { initialNodes, initialEdges } from "@/mocks";
import getLayoutedElements from "@/utils/getLayoutElements";

type EventFlowContext = {
  value: number;
  store: typeof eventsFlowStore;
} & ReturnType<typeof getLayoutedElements>;

export const Store = createContext({} as EventFlowContext);

export function useEventsFlowContext() {
  return useContext(Store);
}

export const StoreProvider = (props: any) => {
  const { children } = props;
  const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);
  const params = {
    value: 0,
    store: eventsFlowStore,
    nodes,
    edges,
  };

  return <Store.Provider value={params}>{children}</Store.Provider>;
};
