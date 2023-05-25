import dagre from 'dagre';

import { Position } from 'reactflow'
import type { BasicEdgeType, BasicNodeType } from '../types';
import { CUSTOM_NODE_BASIC_TYPE_MAP } from '@/constant/customNodes';
import { NodeCustomEnum } from '@/types/customNodes';


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const startX = (window.document.documentElement.offsetWidth / 2) - ((CUSTOM_NODE_BASIC_TYPE_MAP[NodeCustomEnum.START].width || nodeWidth) / 2)
const startY = 200

function genNodePosition(node: BasicNodeType, container = window.document.documentElement) {
    const nodeWithPosition = dagreGraph.node(node.id);
    const predecessors = dagreGraph.predecessors(node.id)
    const successors = dagreGraph.successors(node.id)

    console.log(node.data.label, 'predecessors', predecessors)
    console.log(node.data.label, 'successors', successors)

    let basicX = nodeWithPosition.x - (node.width || nodeWidth) / 2;
    let basicY = nodeWithPosition.y - (node.height || nodeHeight) / 2;

    if (node.type) {
        // if ([NodeCustomEnum.START].includes(node.type)) {
        //     console.log(container.offsetWidth, node.width)
        //     basicX = startX;
        //     basicY = startY
        // } else if ([NodeCustomEnum.END].includes(node.type)) {
        //     basicX = startX;
        //     basicY = startY + nodeWithPosition.y - nodeHeight / 2
        // }
    }
    return {
        x: basicX,
        y: basicY
    }
}

function getLayoutedElements(nodes: BasicNodeType[], edges: BasicEdgeType[], direction = 'TB'): {
    nodes: BasicNodeType[],
    edges: BasicEdgeType[]
} {
    dagreGraph.setGraph({ rankdir: direction, nodesep: 10, compound: true, });

    nodes.forEach((node) => {
        const basicLabel: any = {
            width: nodeWidth, height: nodeHeight,
        }
        if (node.type) {
            const { width, height } = CUSTOM_NODE_BASIC_TYPE_MAP[node.type]
            basicLabel.width = width;
            basicLabel.height = height
        }
        dagreGraph.setNode(node.id, { ...basicLabel });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);


    nodes.forEach((node) => {
        node.targetPosition = Position.Top;
        node.sourcePosition = Position.Bottom
        node.position = genNodePosition(node)
    });

    edges.forEach((edge) => {
        // edge.deletable = false
        // edge.selected = false
        // edge.focusable = false
        // edge.updatable = false
    })

    return { nodes, edges };
}

export default getLayoutedElements