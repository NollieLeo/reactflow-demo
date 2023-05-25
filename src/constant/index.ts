
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Controls,
    MiniMap,
    Background,
    MarkerType,
    NodeToolbar,
} from "reactflow";
import { CustomNodeData } from "../types";

const basicNodeData: Pick<Node<CustomNodeData>, 'data' | 'className'> = {
    data: {
        label: 'holy shit',
    },
    className: 'node'
}

export {
    basicNodeData
}