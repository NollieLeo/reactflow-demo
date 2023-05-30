import { createContext, useContext, useState } from "react";
import { eventsFlowStore } from "./useEventsFlowStore";
import { BasicEdgeType, BasicNodeType } from "@/types";
import { initialNodes, initialEdges } from "@/mocks";
import { NodeCustomEnum } from "@/types/customNodes";
import { createEdge, createNode } from "@/utils/createNode";
import { getConnectedEdges, getIncomers, getOutgoers } from "reactflow";

type EventFlowContext = {
  store: typeof eventsFlowStore;
  nodes: BasicNodeType[];
  edges: BasicEdgeType[];
  onAddNodes(
    sourceId: string,
    nodeType?: NodeCustomEnum.PROCESS | NodeCustomEnum.DECISION
  ): void;
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

  const genDesicionNodeAndEdges = (
    sourceId: string
  ): [BasicNodeType[], BasicEdgeType[]] => {
    const newNode = createNode({
      type: NodeCustomEnum.DECISION,
      data: { label: "desicion" },
    });

    const leftEmptyNode = createNode({
      type: NodeCustomEnum.EMPTY,
      data: { label: "left" },
    });
    const rightEmptyNode = createNode({
      type: NodeCustomEnum.EMPTY,
      data: { label: "right" },
    });

    const newEdge = createEdge({
      source: sourceId,
      target: newNode.id,
    });

    const edgeToLeft = createEdge({
      source: newNode.id,
      target: leftEmptyNode.id,
    });

    const edgeToRight = createEdge({
      source: newNode.id,
      target: rightEmptyNode.id,
    });

    return [
      [newNode, leftEmptyNode, rightEmptyNode],
      [newEdge, edgeToLeft, edgeToRight],
    ];
  };

  const genProcessNodeAndEdges = (
    sourceId: string
  ): [BasicNodeType[], BasicEdgeType[]] => {
    const newNode = createNode({
      type: NodeCustomEnum.PROCESS,
      data: {
        label: "motherfucker",
      },
    });

    const newEdge = createEdge({
      source: sourceId,
      target: newNode.id,
    });
    return [[newNode], [newEdge]];
  };

  const genNodesAndEdgesMap = {
    [NodeCustomEnum.PROCESS]: genProcessNodeAndEdges,
    [NodeCustomEnum.DECISION]: genDesicionNodeAndEdges,
  };

  /** node add callback */
  const onAddNodes: EventFlowContext["onAddNodes"] = (
    sourceId,
    addonNodeType = NodeCustomEnum.PROCESS
  ) => {
    let currentNodes = nodes;

    const sourceNode = getNodeById(sourceId);

    let realSourceId = sourceId;

    if (!sourceNode) {
      throw `node: ${sourceId} doesn't exsit`;
    }

    const { type: sourceNodeType } = sourceNode;

    if (sourceNodeType === NodeCustomEnum.EMPTY) {
      const incomers = getIncomers(sourceNode, nodes, edges);
      const parent = incomers[0];
      if (parent) realSourceId = parent.id;
      currentNodes = currentNodes.filter((node) => node !== sourceNode);
    }

    const [newNodes, newEdges] =
      genNodesAndEdgesMap[addonNodeType](realSourceId);

    setNodes(currentNodes.concat(newNodes));
    setEdges((edges) => edges.concat(newEdges));
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
