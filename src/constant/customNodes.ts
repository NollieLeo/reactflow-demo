import { ComponentType } from "react";
import { NodeProps } from "reactflow";
import { NodeCustomEnum } from "../types/customNodes";
import { BasicNodeType } from "@/types";

import CustomStartNode from "../components/customStartNode";
import CustomProcessNode from "@/components/customProcessNode";
import CustomDecisionNode from "@/components/customDecisionNode";
import CustomEmptyNode from "@/components/customEmptyNode";


export const BASIC_NODE_TYPE_DATA: Partial<BasicNodeType> = {
    deletable: false,
    selected: false,
    draggable: false,
    dragging: false
}

const CUSTOM_NODE_BASIC_TYPE_MAP: Record<NodeCustomEnum, Partial<BasicNodeType>> = {
    [NodeCustomEnum.START]: {
        ...BASIC_NODE_TYPE_DATA,
    },
    [NodeCustomEnum.PROCESS]: {
        ...BASIC_NODE_TYPE_DATA,
    },
    [NodeCustomEnum.DECISION]: {
        ...BASIC_NODE_TYPE_DATA,
    },
    [NodeCustomEnum.EMPTY]: {
        ...BASIC_NODE_TYPE_DATA,
    }
}

const CUSTOM_NODE_TYPES: Record<NodeCustomEnum, ComponentType<NodeProps>> = {
    [NodeCustomEnum.START]: CustomStartNode,
    [NodeCustomEnum.PROCESS]: CustomProcessNode,
    [NodeCustomEnum.DECISION]: CustomDecisionNode,
    [NodeCustomEnum.EMPTY]: CustomEmptyNode,
}

export {
    CUSTOM_NODE_TYPES,
    CUSTOM_NODE_BASIC_TYPE_MAP
}