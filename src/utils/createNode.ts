import { BASIC_NODE_TYPE_DATA } from '@/constant/customNodes';
import { BasicEdgeType, BasicNodeType } from '../types/index'
import uniqid from 'uniqid'

export function createNode(nodeData: Omit<BasicNodeType, 'id'>): BasicNodeType {
    const nodeId = uniqid.process();

    return {
        ...nodeData,
        ...BASIC_NODE_TYPE_DATA,
        id: nodeId,
    }
}


export function createEdge(nodeData: Omit<BasicEdgeType, 'id'>): BasicEdgeType {
    const edgeId = uniqid.process();

    return {
        ...nodeData,
        id: edgeId,
        style: { opacity: 0 },
    }
}