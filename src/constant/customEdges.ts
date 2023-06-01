import { ComponentType } from "react";
import { EdgeProps } from "reactflow";
import { EdgeCustomEnum } from "../types/customEdges";
import SuccessEdge from "@/components/SuccessEdge";
import ErrorEdge from "@/components/ErrorEdge";
import CommonEdge from "@/components/CommonEdge";


const CUSTOM_EDGE_TYPES: Record<EdgeCustomEnum, ComponentType<EdgeProps>> = {
    [EdgeCustomEnum.Success]: SuccessEdge,
    [EdgeCustomEnum.Error]: ErrorEdge,
    [EdgeCustomEnum.Common]: CommonEdge
}

export {
    CUSTOM_EDGE_TYPES
}