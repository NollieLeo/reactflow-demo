import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  Edge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  useReactFlow,
  MarkerType,
  NodeMouseHandler,
  OnNodesChange,
  OnEdgesChange,
  NodeChange,
} from "reactflow";
import uniqid from "uniqid";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  DragEventHandler,
  DragEvent,
  MouseEvent,
} from "react";
import "reactflow/dist/style.css";
import { Button, Modal } from "antd";
import { CUSTOM_NODE_TYPES } from "@/constant/customNodes";
import { CUSTOM_EDGE_TYPES } from "@/constant/customEdges";
import { useEventsFlowContext } from "./stores";
import useAutoLayout from "@/hooks/useAutoLayout";
import { initialEdges, initialNodes } from "@/mocks";
import { BasicEdgeType, BasicNodeType } from "@/types";
import "./index.scss";
import { NodeCustomEnum } from "@/types/customNodes";

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 10 },
};

const proOptions = {
  account: "wengweng",
  hideAttribution: true,
};

export default function App() {
  // this hook handles the computation of the layout once the elements or the direction changes
  const { fitView } = useReactFlow();
  const { edges, nodes, setEdges, setNodes, onUpdateNode } =
    useEventsFlowContext();

  useAutoLayout({ direction: "TB" });

  const [selectedNode, setSelectedNode] = useState<BasicNodeType>();

  // this function is called once the node from the sidebar is dropped onto a node in the current graph
  const onDrop: DragEventHandler = (evt: DragEvent<HTMLDivElement>) => {
    // make sure that the event target is a DOM element
    // if (evt.target instanceof Element) {
    //   // from the target element search for the node wrapper element which has the node id as attribute
    //   const targetId = evt.target
    //     .closest(".react-flow__node")
    //     ?.getAttribute("data-id");
    //   if (targetId) {
    //     // now we can create a connection to the drop target node
    //     onAddNodes(targetId);
    //   }
    // }
  };

  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes));
  };

  const onEdgesChange: OnEdgesChange = (changes: EdgeChange[]) => {
    setEdges((edges) => applyEdgeChanges(changes, edges));
  };

  // every time  nodes change, we want to center the graph again
  useEffect(() => {
    fitView({ duration: 400 });
  }, [nodes, fitView]);

  const onNodesDelete = useCallback(
    (deleted) => {
      const newEdges = deleted.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);
        const remainingEdges = acc.filter(
          (edge) => !connectedEdges.includes(edge)
        );

        const createdEdges = incomers.flatMap(
          ({ id: source, type: sourceType }) =>
            outgoers
              .map(({ id: target, type: targetType }) => {
                if (
                  targetType !== NodeCustomEnum.END ||
                  sourceType !== NodeCustomEnum.START
                ) {
                  return {
                    id: uniqid.process(),
                    source,
                    target,
                    type: "smoothstep",
                  };
                }
                return undefined;
              })
              .filter(Boolean)
        );
        return [...remainingEdges, ...createdEdges];
      }, edges);
      setEdges(newEdges);
    },
    [nodes, edges]
  );

  // this function is called when a node in the graph is clicked
  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: BasicNodeType
  ) => {
    if (node) {
      setSelectedNode(node);
    }
    // on click, we want to add create a new node connection the clicked node
    // onAddNodes(node.id);
  };

  return (
    <div className="events-flow">
      <Button>添加</Button>
      <Modal
        open={!!selectedNode}
        onCancel={() => setSelectedNode(undefined)}
        onOk={() => {
          onUpdateNode(selectedNode?.id, {
            data: {
              label: "Motherfucker",
            },
          });
          setSelectedNode(undefined);
        }}
      >
        随便改个node
      </Modal>
      <ReactFlow
        fitView
        proOptions={proOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={CUSTOM_NODE_TYPES}
        edgeTypes={CUSTOM_EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        // onNodeMouseEnter={onNodeMouseEnter}
        // onNodeMouseLeave={() => setHoveredNode(undefined)}
        // newly added edges get these options automatically
        minZoom={-Infinity}
        maxZoom={Infinity}
        style={{
          background: "#202020",
        }}
      >
        {/* <Controls />
          <NodeToolbar />
          <MiniMap /> */}
        {/* <Background gap={12} size={1} /> */}
        {/* {renderAddBtnByHoveredNodePosition()} */}
      </ReactFlow>
    </div>
  );
}
