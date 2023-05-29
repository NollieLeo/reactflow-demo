import { createContext, useContext, useState } from "react";
import { eventsFlowStore } from "./useEventsFlowStore";
import { BasicEdgeType, BasicNodeType } from "@/types";
import { initialNodes, initialEdges } from "@/mocks";
import uniqid from "uniqid";
import { NodeCustomEnum } from "@/types/customNodes";
import {
  Position,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from "reactflow";

type EventFlowContext = {
  store: typeof eventsFlowStore;
  nodes: BasicNodeType[];
  edges: BasicEdgeType[];
  onAddNodes(
    sourceId: string,
    position?: Position
  ): [BasicNodeType, BasicEdgeType];
  onUpdateNode(nodeId: string, nodeData: BasicNodeType): void;
  setNodes: React.Dispatch<React.SetStateAction<BasicNodeType[]>>;
  setEdges: React.Dispatch<React.SetStateAction<BasicEdgeType[]>>;
};

export const Store = createContext({} as EventFlowContext);

export function useEventsFlowContext() {
  return useContext(Store);
}

export const StoreProvider = (props: any) => {
  const { children } = props;
  const [nodes, setNodes] = useState<BasicNodeType[]>(initialNodes);
  const [edges, setEdges] = useState<BasicEdgeType[]>(initialEdges);

  const getNodeById = (id: BasicNodeType["id"]) => {
    return nodes.find((node) => node.id === id);
  };

  /** node add callback */
  const onAddNodes: EventFlowContext["onAddNodes"] = (
    sourceId,
    position = Position.Bottom,
    targetNodeData?: BasicNodeType
  ) => {
    const targetId = uniqid.process();

    const sourceNode = getNodeById(sourceId);
    if (!sourceNode) {
      throw `node: ${sourceId} doesn't exsit`;
    }

    const { type } = sourceNode;
    const incomers = getOutgoers(sourceNode, nodes, edges);
    const connectedEdges = getConnectedEdges([sourceNode], edges);

    const newNode: BasicNodeType = {
      id: targetId,
      type: NodeCustomEnum.PROCESS,
      position: { x: 0, y: 0 },
      data: {
        label: uniqid.process(),
      },
    };

    const connectionSourceToNewTarget = {
      id: uniqid.process(),
      source: sourceId,
      target: targetId,
      style: { opacity: 0 },
      sourceHandle: position,
    };

    if ([NodeCustomEnum.PROCESS, NodeCustomEnum.START].includes(type)) {
      const firstTarget = incomers[0];
      const edgeShouldBeDeleted = connectedEdges.find(
        (edge) => edge.source === sourceId && edge.target === firstTarget.id
      );

      const connectionNewTargetToOldTarget = {
        id: uniqid.process(),
        source: targetId,
        target: firstTarget.id,
        style: { opacity: 0 },
        sourceHandle: position,
      };

      setNodes((nodes) => nodes.concat([newNode]));
      setEdges((edges) =>
        edges
          .filter((edge) => edgeShouldBeDeleted !== edge)
          .concat([connectionSourceToNewTarget, connectionNewTargetToOldTarget])
      );
    } else if (type === NodeCustomEnum.DECISION) {
      const edgeShouldBeDeleted = connectedEdges.find(
        (edge) => edge.sourceHandle === position
      );
      if (!edgeShouldBeDeleted) return;
      const oldTargetNode = getNodeById(edgeShouldBeDeleted?.target);
      if (!oldTargetNode) return;
      const connectionNewTargetToOldTarget = {
        id: uniqid.process(),
        source: targetId,
        target: oldTargetNode?.id,
        style: { opacity: 0 },
        sourceHandle: position,
      };
      setNodes((nodes) => nodes.concat([newNode]));
      setEdges((edges) =>
        edges
          .filter((edge) => edgeShouldBeDeleted !== edge)
          .concat([connectionSourceToNewTarget, connectionNewTargetToOldTarget])
      );
    }
  };

  const onUpdateNode: EventFlowContext["onUpdateNode"] = (nodeId, nodeData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            ...nodeData,
          };
        }
        return node;
      })
    );
  };

  const params = {
    store: eventsFlowStore,
    nodes,
    edges,
    onAddNodes,
    setNodes,
    setEdges,
    onUpdateNode,
  };

  return <Store.Provider value={params}>{children}</Store.Provider>;
};
