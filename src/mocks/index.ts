import { NodeCustomEnum } from "@/types/customNodes";
import { EdgeCustomEnum } from "../types/customEdges";
import { BasicNodeType } from "@/types";
import { CUSTOM_NODE_BASIC_TYPE_MAP } from "@/constant/customNodes";

const position = { x: 0, y: 0 };

export const initialNodes: BasicNodeType[] = [
    {
        id: "1",
        type: NodeCustomEnum.START,
        data: { label: "Request PTO", },
        position,
    },
    {
        id: "2",
        type: NodeCustomEnum.PROCESS,
        data: { label: "manager reviews data" },
        position,
    },
    {
        id: "3",
        type: NodeCustomEnum.DECISION,
        data: { label: "Pending manager approval" },
        position,
    },
    {
        id: "4",
        type: NodeCustomEnum.PROCESS,
        data: { label: "PTO request approved" },
        position,
    },
    {
        id: "5",
        type: NodeCustomEnum.PROCESS,
        data: { label: "PTO request denied" },
        position,
    },
    {
        id: "6",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Notify teammate1" },
        position,
    },
    {
        id: "7",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Notify teammate2" },
        position,
    },
    {
        id: "8",
        type: NodeCustomEnum.END,
        data: { label: "End", },
        position
    }
];

export const initialEdges = [
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
        type: 'smoothstep'

    },
    {
        id: "e3-5",
        source: "3",
        target: "5",
        type: 'smoothstep'

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
    {
        id: "e6-8",
        source: "6",
        target: "8",
        type: 'smoothstep'

    },
    {
        id: "e7-8",
        source: "7",
        target: "8",
        type: 'smoothstep'

    }
];
