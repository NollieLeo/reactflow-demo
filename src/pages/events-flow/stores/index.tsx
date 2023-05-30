import { createContext, useContext, useState } from "react";
import { eventsFlowStore } from "./useEventsFlowStore";
import { BasicEdgeType, BasicNodeType } from "@/types";
import { initialNodes, initialEdges } from "@/mocks";
import { NodeCustomEnum } from "@/types/customNodes";
import { createEdge, createNode } from "@/utils/createNode";

type EventFlowContext = {
  store: typeof eventsFlowStore;
  nodes: BasicNodeType[];
  edges: BasicEdgeType[];
  onAddAction(
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
    sourceId: string,
    isUpdate?: boolean
  ): [BasicNodeType[], BasicEdgeType[]] => {
    const sourceNode = getNodeById(sourceId);

    if (!sourceNode) {
      throw `node: ${sourceId} doesn't exsit`;
    }

    const createdNode = createNode({
      type: NodeCustomEnum.DECISION,
      data: { label: "desicion" },
      position: sourceNode.position,
    });

    const leftEmptyNode = createNode({
      type: NodeCustomEnum.EMPTY,
      data: { label: "left" },
      position: sourceNode.position,
    });

    const rightEmptyNode = createNode({
      type: NodeCustomEnum.EMPTY,
      data: { label: "right" },
      position: sourceNode.position,
    });

    const newEdge = createEdge({
      source: sourceId,
      target: createdNode.id,
    });

    const edgeToLeft = createEdge({
      source: !isUpdate ? createdNode.id : sourceId,
      target: leftEmptyNode.id,
    });

    const edgeToRight = createEdge({
      source: !isUpdate ? createdNode.id : sourceId,
      target: rightEmptyNode.id,
    });

    const resNodes = isUpdate
      ? nodes.map((node) => {
          if (node.id === sourceId) {
            return {
              ...createdNode,
              position: node.position,
              id: sourceId,
            };
          }
          return node;
        })
      : nodes.concat([createdNode]);

    const resEdges = isUpdate ? edges : edges.concat([newEdge]);

    return [
      resNodes.concat([leftEmptyNode, rightEmptyNode]),
      resEdges.concat([edgeToLeft, edgeToRight]),
    ];
  };

  const genProcessNodeAndEdges = (
    sourceId: string,
    isUpdate?: boolean
  ): [BasicNodeType[], BasicEdgeType[]] => {
    const sourceNode = getNodeById(sourceId);

    if (!sourceNode) {
      throw `node: ${sourceId} doesn't exsit`;
    }
    const createdNode = createNode({
      type: NodeCustomEnum.PROCESS,
      data: {
        label: "motherfucker",
      },
      position: sourceNode.position,
    });

    const newEdge = createEdge({
      source: sourceId,
      target: createdNode.id,
    });
    const resNodes = !isUpdate
      ? nodes.concat([createdNode])
      : nodes.map((node) => {
          if (node.id === sourceId) {
            return {
              ...createdNode,
              position: node.position,
              id: sourceId,
            };
          }
          return node;
        });
    const resEdges = !isUpdate ? edges.concat([newEdge]) : edges;

    return [resNodes, resEdges];
  };

  const genNodesAndEdgesMap = {
    [NodeCustomEnum.PROCESS]: genProcessNodeAndEdges,
    [NodeCustomEnum.DECISION]: genDesicionNodeAndEdges,
  };

  /** node add callback */
  const onAddAction: EventFlowContext["onAddAction"] = (
    sourceId,
    addonNodeType = NodeCustomEnum.PROCESS
  ) => {
    const sourceNode = getNodeById(sourceId);

    if (!sourceNode) {
      throw `node: ${sourceId} doesn't exsit`;
    }

    const { type: sourceNodeType } = sourceNode;

    const shouldUpdateSourceNode = sourceNodeType === NodeCustomEnum.EMPTY;

    const [newNodes, newEdges] = genNodesAndEdgesMap[addonNodeType](
      sourceId,
      shouldUpdateSourceNode
    );

    setNodes(() => newNodes);
    setEdges(() => newEdges);
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
    onAddAction,
    setNodes,
    setEdges,
    onUpdateNode,
  };

  return <Store.Provider value={params}>{children}</Store.Provider>;
};
