
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

type BasicNodeType = Node<CustomNodeData, NodeCustomEnum | string>

type BasicEdgeType = Edge


export type {
    CustomEdgeData,
    CustomNodeData,
    BasicNodeType,
    BasicEdgeType
}