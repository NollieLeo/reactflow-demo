import { ComponentType } from "react";
import { NodeProps } from "reactflow";
import { NodeCustomEnum } from "../types/customNodes";
import { BasicNodeType } from "@/types";

import CustomStartNode from "../components/customStartNode";
import CustomEndNode from "../components/customEndNode";
import CustomProcessNode from "@/components/customProcessNode";
import CustomDecisionNode from "@/components/customDecisionNode";


const BASIC_NODE_TYPE_DATA: Partial<BasicNodeType> = {
    deletable: false,
    selected: false,
    draggable: false,
    dragging: false
}

const CUSTOM_NODE_BASIC_TYPE_MAP: Record<NodeCustomEnum, Partial<BasicNodeType>> = {
    [NodeCustomEnum.START]: {
        ...BASIC_NODE_TYPE_DATA,
        width: 80,
        height: 40,
    },
    [NodeCustomEnum.END]: {
        ...BASIC_NODE_TYPE_DATA,
        width: 60,
        height: 36,
    },
    [NodeCustomEnum.PROCESS]: {
        ...BASIC_NODE_TYPE_DATA,
        width: 128,
        height: 56,
    },
    [NodeCustomEnum.DECISION]: {
        ...BASIC_NODE_TYPE_DATA,
        width: 70,
        height: 70,
    }
}

const CUSTOM_NODE_TYPES: Record<NodeCustomEnum, ComponentType<NodeProps>> = {
    [NodeCustomEnum.START]: CustomStartNode,
    [NodeCustomEnum.END]: CustomEndNode,
    [NodeCustomEnum.PROCESS]: CustomProcessNode,
    [NodeCustomEnum.DECISION]: CustomDecisionNode
}

export {
    CUSTOM_NODE_TYPES,
    CUSTOM_NODE_BASIC_TYPE_MAP
}