
import {
    Node,
    Edge,
} from "reactflow";
import { NodeCustomEnum } from "./customNodes";

interface CustomNodeData {
    label: string;
}

interface CustomEdgeData {
    name: "motherfucker";
}

type NodeTypeWrapper<D extends CustomNodeData, T extends NodeCustomEnum> = Node<D, T>

export type CustomCommonnNodeType = NodeTypeWrapper<CustomNodeData, NodeCustomEnum>;

export type CustomBatchNodeType = NodeTypeWrapper<{
    label: string,
    triggers: any[]
}, NodeCustomEnum.BATCH>

type BasicNodeType = CustomCommonnNodeType | CustomBatchNodeType

type BasicEdgeType = Edge


export type {
    CustomEdgeData,
    CustomNodeData,
    BasicNodeType,
    BasicEdgeType
}