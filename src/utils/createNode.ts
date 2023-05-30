import { BasicEdgeType, BasicNodeType } from '../types/index'
import uniqid from 'uniqid'

export function createNode(nodeData: Omit<BasicNodeType, 'id' | 'position'>): BasicNodeType {
    const nodeId = uniqid.process();

    return {
        ...nodeData,
        position: { x: 0, y: 0 },
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