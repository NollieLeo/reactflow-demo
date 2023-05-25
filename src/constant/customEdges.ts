import { ComponentType } from "react";
import { EdgeProps } from "reactflow";
import { EdgeCustomEnum } from "../types/customEdges";
import CustomButtonEdge from "../components/customButtonEdge";


const CUSTOM_EDGE_TYPES: Record<EdgeCustomEnum, ComponentType<EdgeProps>> = {
    [EdgeCustomEnum.BUTTON]: CustomButtonEdge,
}

export {
    CUSTOM_EDGE_TYPES
}