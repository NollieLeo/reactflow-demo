import { NodeCustomEnum } from "@/types/customNodes";
import { BasicEdgeType, BasicNodeType } from "@/types";
import { CUSTOM_NODE_BASIC_TYPE_MAP } from "@/constant/customNodes";

const position = { x: 0, y: 0 };

export const initialNodes: BasicNodeType[] = [
    {
        id: NodeCustomEnum.START,
        type: NodeCustomEnum.START,
        data: { label: "Begin", },
        position,
        deletable: false,
    },
    {
        id: "2",
        type: NodeCustomEnum.PROCESS,
        data: { label: "Stupid2" },
        position,
    },
].map((node) => ({ ...node, ...CUSTOM_NODE_BASIC_TYPE_MAP[node.type], }));

export const initialEdges: BasicEdgeType[] = [
    {
        id: "e1-2",
        source: "customStartNode",
        target: "2",
        type: 'smoothstep'
    },
];
