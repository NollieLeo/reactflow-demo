import { useEffect } from 'react';
import { Position, ReactFlowState, useStore, useReactFlow } from 'reactflow';
import { stratify, tree, HierarchyPointNode } from 'd3-hierarchy';
import { BasicEdgeType, BasicNodeType } from '@/types';
import isDefined from '@/utils/isDefined';

// the layout direction (T = top, R = right, B = bottom, L = left, TB = top to bottom, ...)
export type Direction = 'TB' | 'LR' | 'RL' | 'BT';

export type Options = {
    direction: Direction;
};

// const BASIC_GAP = 

const positionMap: Record<string, Position> = {
    T: Position.Top,
    L: Position.Left,
    R: Position.Right,
    B: Position.Bottom,
};

const getPosition = (pointNode: HierarchyPointNode<BasicNodeType>, direction: Direction,) => {
    const { x, y, } = pointNode;
    switch (direction) {
        case 'LR':
            return { x: y, y: x };
        case 'RL':
            return { x: -y, y: -x };
        case 'BT':
            return { x: -x, y: -y };
        default:
            return { x, y };
    }
};

// initialize the tree layout (see https://observablehq.com/@d3/tree for examples)
const layout = tree<BasicNodeType>()
    // the node size configures the spacing between the nodes ([width, height])
    .nodeSize([220, 110])
    // this is needed for creating equal space between all nodes
    .separation((nodeA, nodeB) => {
        console.log(nodeA, nodeB);
        const maxWidth = Math.max(nodeA.data.width || 0, nodeB.data.width || 0);
        const minWidth = Math.min(nodeA.data.width || 0, nodeB.data.width || 0);
        if (maxWidth === minWidth) return 1
        console.log(maxWidth / minWidth)
        return (maxWidth / minWidth) * (maxWidth / 220)
    });

const nodeCountSelector = (state: ReactFlowState) => state.nodeInternals.size;

const nodesInitializedSelector = (state: ReactFlowState) =>
    Array.from(state.nodeInternals.values()).every((node) => node.width && node.height);

function useAutoLayout(options: Options) {
    const { direction } = options;
    const nodeCount = useStore(nodeCountSelector);
    const nodesInitialized = useStore(nodesInitializedSelector);
    const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow();

    useEffect(() => {
        // only run the layout if there are nodes and they have been initialized with their dimensions
        if (!nodeCount || !nodesInitialized) {
            return;
        }

        const nodes: BasicNodeType[] = getNodes();
        const edges: BasicEdgeType[] = getEdges();

        const hierarchy = stratify<BasicNodeType>()
            .id((node) => node.id)
            // get the id of each node by searching through the edges
            // this only works if every node has one connection
            .parentId((node: BasicNodeType) => {
                return edges.find((e: BasicEdgeType) => e.target === node.id)?.source
            })

        const layerTree = hierarchy(nodes)

        // run the layout algorithm with the hierarchy data structure
        const root = layout(layerTree);

        // set the React Flow nodes with the positions from the layout
        setNodes((nodes) =>
            nodes.map((node) => {
                // find the node in the hierarchy with the same id and get its coordinates and generate the fucking position
                const curNode = root.find((d) => d.id === node.id);
                if (!curNode) return undefined

                return {
                    ...node,
                    sourcePosition: positionMap[direction[1]],
                    targetPosition: positionMap[direction[0]],
                    position: getPosition(curNode, direction),
                    style: { opacity: 1 },
                };
            }).filter(isDefined)
        );

        setEdges((edges) => edges.map((edge) => ({ ...edge, deletable: false, selected: false, focusable: false, style: { opacity: 1 } })));
    }, [nodeCount, nodesInitialized, getNodes, getEdges, setNodes, setEdges, fitView, direction]);
}

export default useAutoLayout;
