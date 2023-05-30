import { NodeCustomEnum } from "@/types/customNodes";
import { EdgeCustomEnum } from "../types/customEdges";
import { BasicEdgeType, BasicNodeType } from "@/types";
import { CUSTOM_NODE_BASIC_TYPE_MAP } from "@/constant/customNodes";

const position = { x: 0, y: 0 };

export const initialNodes: BasicNodeType[] = [
    {
        id: "1",
        type: NodeCustomEnum.START,
        data: { label: "Stupid", },
        position,
    },
    {
        id: "2",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Stupid2" },
        position,
    },
    {
        id: "3",
        type: NodeCustomEnum.DECISION,
        data: { label: "Stupid3" },
        position,
    },
    {
        id: "4",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Stupid4" },
        position,
    },
    {
        id: "5",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Stupid5" },
        position,
    },
    {
        id: "6",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Stupid6" },
        position,
    },
    {
        id: "7",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Stupid7" },
        position,
    },
];

export const initialEdges: BasicEdgeType[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        type: 'smoothstep'
    },
    {
        id: "e2-3",
        source: "2",
        target: "3",
        type: 'smoothstep'
    },
    {
        id: "e3-4",
        source: "3",
        target: "4",
        type: 'smoothstep',
        sourceHandle: 'left'
    },
    {
        id: "e3-5",
        source: "3",
        target: "5",
        type: 'smoothstep',
        sourceHandle: 'right'

    },
    {
        id: "e4-6",
        source: "4",
        target: "6",
        type: 'smoothstep'

    },
    {
        id: "e5-7",
        source: "5",
        target: "7",
        type: 'smoothstep'

    },
];
