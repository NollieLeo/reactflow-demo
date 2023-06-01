import { createContext, useContext, useState } from "react";
import { eventsFlowStore } from "./useEventsFlowStore";
import { BasicEdgeType, BasicNodeType } from "@/types";
import { initialNodes, initialEdges } from "@/mocks";
import { NodeCustomEnum } from "@/types/customNodes";
import { createEdge, createNode } from "@/utils/createNode";
import useAutoLayout from "@/hooks/useAutoLayout";
import { getIncomers, getOutgoers, useReactFlow } from "reactflow";
import { EdgeCustomEnum } from "@/types/customEdges";

type EventFlowContext = {
  store: typeof eventsFlowStore;
  nodes: BasicNodeType[];
  edges: BasicEdgeType[];
  onAddAction(
    sourceId: string,
    nodeType?: NodeCustomEnum.PROCESS | NodeCustomEnum.DECISION
  ): void;
  onUpdateAction(
    nodeId: BasicNodeType["id"],
    nodeData: Partial<BasicNodeType>
  ): void;
  onDeleteAction(nodeId: BasicNodeType["id"], type?: "node" | "tree"): void;
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
  const renderLayout = useAutoLayout({ direction: "TB" });
  const { deleteElements, getNode } = useReactFlow();

  const getNodeById = (id: BasicNodeType["id"]) => {
    return getNode(id);
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
      type: EdgeCustomEnum.Success,
    });

    const edgeToRight = createEdge({
      source: !isUpdate ? createdNode.id : sourceId,
      target: rightEmptyNode.id,
      type: EdgeCustomEnum.Error,
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
              width: createdNode.width,
              height: createdNode.height,
              id: sourceId,
            };
          }
          return node;
        });
    const resEdges = !isUpdate ? edges.concat([newEdge]) : edges;

    return [resNodes, resEdges];
  };

  const genBatchNodeAndEdges = (sourceId: string, isUpdate?: boolean) => {
    const sourceNode = getNodeById(sourceId);

    if (!sourceNode) {
      throw `node: ${sourceId} doesn't exsit`;
    }
    const createdNode = createNode({
      type: NodeCustomEnum.BATCH,
      data: {
        label: "motherfucker",
        triggers: [1213],
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
              width: createdNode.width,
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
    [NodeCustomEnum.BATCH]: genBatchNodeAndEdges,
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

  const onUpdateAction: EventFlowContext["onUpdateAction"] = (
    nodeId,
    nodeData
  ) => {
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
    setTimeout(() => {
      renderLayout();
    }, 0);
  };

  const onDeleteAction: EventFlowContext["onDeleteAction"] = (
    nodeId: BasicNodeType["id"],
    type = "tree"
  ) => {
    const node = getNodeById(nodeId);
    if (!node) {
      throw new Error(`delete node failed, the node ${nodeId} doesn't exist`);
    }

    const incomers = getIncomers(node, nodes, edges);
    const outers = getOutgoers(node, nodes, edges);

    if (incomers[0].type === NodeCustomEnum.DECISION) {
      deleteElements({
        nodes: outers,
      });
      onUpdateAction(nodeId, {
        type: NodeCustomEnum.EMPTY,
      });
      return;
    }

    const deleteNodes = type === "tree" ? outers.concat(node) : [node];
    deleteElements({
      nodes: deleteNodes,
    });
  };

  const params = {
    store: eventsFlowStore,
    nodes,
    edges,
    onAddAction,
    setNodes,
    setEdges,
    onUpdateAction,
    onDeleteAction,
  };

  return <Store.Provider value={params}>{children}</Store.Provider>;
};
