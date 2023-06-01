import ReactFlow, {
  useReactFlow,
  MarkerType,
  NodeMouseHandler,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { useEffect, useState, MouseEvent } from "react";
import "reactflow/dist/style.css";
import { Modal } from "antd";
import { CUSTOM_NODE_TYPES } from "@/constant/customNodes";
import { CUSTOM_EDGE_TYPES } from "@/constant/customEdges";
import { BasicNodeType } from "@/types";

import "./index.scss";
import { initialNodes, initialEdges } from "@/mocks";
import useFlowActions from "@/hooks/useFlowActions";

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
  const { onUpdateAction } = useFlowActions();

  const [nodes, _setNodes, onNodesChange] =
    useNodesState<BasicNodeType["data"]>(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState<BasicNodeType>();

  // every time  nodes change, we want to center the graph again
  useEffect(() => {
    fitView({ duration: 800 });
  }, [nodes, fitView]);

  // this function is called when a node in the graph is clicked
  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: BasicNodeType
  ) => {
    if (node) {
      // setSelectedNode(node);
    }
    // on click, we want to add create a new node connection the clicked node
    // onAddNodes(node.id);
  };

  return (
    <div className="events-flow">
      <Modal
        open={!!selectedNode}
        onCancel={() => setSelectedNode(undefined)}
        onOk={() => {
          onUpdateAction(selectedNode?.id, {
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
        onNodeClick={onNodeClick}
        // onNodeMouseEnter={onNodeMouseEnter}
        // onNodeMouseLeave={() => setHoveredNode(undefined)}
        // newly added edges get these options automatically
        minZoom={-Infinity}
        maxZoom={1}
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
