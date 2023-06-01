import { useCallback, useEffect } from 'react';
import { Position, ReactFlowState, useStore, useReactFlow } from 'reactflow';
import { stratify, HierarchyPointNode, tree } from 'd3-hierarchy';
import { BasicEdgeType, BasicNodeType } from '@/types';
import isDefined from '@/utils/isDefined';
import { LayoutTree } from '@/utils/genTree';

// the layout direction (T = top, R = right, B = bottom, L = left, TB = top to bottom, ...)
export type Direction = 'TB' | 'LR' | 'RL' | 'BT';

export type Options = {
    direction: Direction;
};

const positionMap: Record<string, Position> = {
    T: Position.Top,
    L: Position.Left,
    R: Position.Right,
    B: Position.Bottom,
};

const tree = new LayoutTree()


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


const nodeCountSelector = (state: ReactFlowState) => state.nodeInternals.size;
const nodesInitializedSelector = (state: ReactFlowState) =>
    Array.from(state.nodeInternals.values()).every((node) => node.width && node.height);


function useAutoLayout(options: Options) {
    const { direction } = options;
    const nodeCount = useStore(nodeCountSelector);
    const nodesInitialized = useStore(nodesInitializedSelector);
    const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();

    const layoutRender = useCallback(() => {
        const nodes: BasicNodeType[] = getNodes();
        const edges: BasicEdgeType[] = getEdges();

        tree.generateTree(nodes, edges)
        // set the React Flow nodes with the positions from the layout
        setNodes((nodes) =>
            nodes.map((node) => {
                // find the node in the hierarchy with the same id and get its coordinates and generate the fucking position
                const curNode = tree.findNodeById(node.id);
                if (!curNode) return undefined

                return {
                    ...node,
                    sourcePosition: positionMap[direction[1]],
                    targetPosition: positionMap[direction[0]],
                    position: getPosition(curNode, direction),
                };
            }).filter(isDefined)
        );

        setEdges((edges) => edges.map((edge) => ({ ...edge, deletable: false, selected: false, focusable: false, style: { opacity: 1 } })));
    }, [direction, getEdges, getNodes, setEdges, setNodes])

    useEffect(() => {
        if (!nodeCount || !nodesInitialized) {
            return;
        }
        layoutRender()
    }, [layoutRender, nodeCount, nodesInitialized]);

    return layoutRender
}

export default useAutoLayout;
