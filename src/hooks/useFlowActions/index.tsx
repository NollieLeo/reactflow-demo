import { BasicNodeType, BasicEdgeType } from "@/types";
import { EdgeCustomEnum } from "@/types/customEdges";
import { NodeCustomEnum } from "@/types/customNodes";
import { createNode, createEdge } from "@/utils/createNode";
import { useReactFlow, getIncomers, getOutgoers } from "reactflow";

type OnAddAction = (
  sourceId: string,
  nodeType?: NodeCustomEnum.PROCESS | NodeCustomEnum.DECISION
) => void;

type onUpdateAction = (
  nodeId: BasicNodeType["id"],
  nodeData: Partial<BasicNodeType>,
  callback?: CallableFunction
) => void;

type OnDeleteAction = (
  nodeId: BasicNodeType["id"],
  type?: "node" | "tree"
) => void;

const useFlowActions = () => {
  const { deleteElements, getNode, getNodes, getEdges, setNodes, setEdges } =
    useReactFlow<BasicNodeType["data"]>();

  const nodes = getNodes();
  const edges = getEdges();

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

  const genProcessNodeAndEdges = (sourceId: string, isUpdate?: boolean) => {
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
  const onAddAction: OnAddAction = (
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

  const onUpdateAction: onUpdateAction = (nodeId, nodeData, callback) => {
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
      callback?.();
    }, 0);
  };

  const onDeleteAction: OnDeleteAction = (nodeId, type = "tree") => {
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

  const hasOutgoers = (nodeId: BasicNodeType["id"]) => {
    const node = getNodeById(nodeId);
    if (!node) return false;
    return !!getOutgoers(node, nodes, edges).length;
  };

  const hasImcomers = (nodeId: BasicNodeType["id"]) => {
    const node = getNodeById(nodeId);
    if (!node) return false;
    return !!getIncomers(node, nodes, edges).length;
  };

  return {
    onAddAction,
    onUpdateAction,
    onDeleteAction,
    hasOutgoers,
    hasImcomers,
  } as const;
};

export default useFlowActions;
