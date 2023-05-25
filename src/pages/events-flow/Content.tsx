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
} from "reactflow";
import { useCallback, useEffect, useMemo } from "react";
import "reactflow/dist/style.css";
import { Button } from "antd";
import { CUSTOM_NODE_TYPES } from "@/constant/customNodes";
import { CUSTOM_EDGE_TYPES } from "@/constant/customEdges";
import getLayoutedElements from "@/utils/getLayoutElements";
import { useEventsFlowContext } from "./stores";
import { NodeCustomEnum } from "@/types/customNodes";

export default function App() {
  const {
    value,
    store,
    edges: layoutedEdges,
    nodes: layoutedNodes,
  } = useEventsFlowContext();

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => CUSTOM_NODE_TYPES, []);
  const edgeTypes = useMemo(() => CUSTOM_EDGE_TYPES, []);

  const onLayout = useCallback(
    (newNodes = nodes, newEdges = edges, direction?: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(newNodes, newEdges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

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
                    id: `${source}->${target}`,
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
      onLayout([...nodes], newEdges);
    },
    [nodes, edges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Button>添加</Button>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          edges={edges}
          onNodesDelete={onNodesDelete}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          defaultEdgeOptions={{
            labelBgBorderRadius:8
          }}
          // fitViewOptions={{
          //   padding: 100,
          // }}
          style={{
            background: "#202020",
          }}
          //   defaultViewport={{
          //     x: 200,
          //     zoom: 1,
          //     y: 200,
          //   }}
          //   minZoom={0.2}
          //   maxZoom={2}
        >
          {/* <Controls />
          <NodeToolbar />
          <MiniMap /> */}
          {/* <Background gap={12} size={1} /> */}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
