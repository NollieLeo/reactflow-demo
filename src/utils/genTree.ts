import { BasicEdgeType, BasicNodeType } from "@/types";
import { NodeCustomEnum } from "@/types/customNodes";
import MindmapLayouts from 'mindmap-layouts';


type TreeNode = {
    originData?: BasicNodeType,
    id: BasicEdgeType['id'],
    name: BasicEdgeType['id'],
    children: TreeNode[]
}


class LayoutTree {
    root: any;
    flatternTree: any;
    constructor(nodes: BasicNodeType[], edges: BasicEdgeType[], rootId = NodeCustomEnum.START) {
        const [root, flatterTree] = this.generateTree(nodes, edges, rootId);
        this.root = root;
        this.flatternTree = flatterTree
    }

    private generateTree(nodes: BasicNodeType[], edges: BasicEdgeType[], rootId = NodeCustomEnum.START) {
        if (!nodes.length && !edges.length) {
            return []
        }

        const nodeMap: Record<TreeNode['id'], TreeNode> = {};

        const result = [];

        for (const node of nodes) {
            const id = node.id;
            const parentId = edges.find((e: BasicEdgeType) => e.target === node.id)?.source;
            const parentNode = nodes.find((node) => node.id === parentId);

            nodeMap[id] = !nodeMap[id] ? {
                originData: node,
                id,
                name: id,
                children: []
            } : { ...nodeMap[id], originData: node };

            const treeNode = nodeMap[id];

            if (id === rootId) {
                result.push(treeNode)
            } else if (parentId) {
                if (!nodeMap[parentId]) {
                    nodeMap[parentId] = {
                        id: parentId,
                        name: parentId,
                        children: [],
                        originData: parentNode
                    }
                }
                nodeMap[parentId].children.push(treeNode)
            }
        }

        const layout = new MindmapLayouts.DownwardOrganizational(result[0], {
            getWidth(node) {
                return node.originData.width
            },
            getHeight(node) {
                return node.originData.height
            },
            getHGap(node) {
                return 40
            },
            getVGap(d) {
                return 40
            }
        }) // root is tree node like above
        const rootNode = layout.doLayout()

        return [rootNode, this.flattern(rootNode)]
    }

    private flattern(nodes = [this.root]) {
        const result = []

        let newArr = [].concat(nodes);

        while (newArr.length) {
            const first = newArr.shift();
            if (first.children) {
                newArr = newArr.concat(first.children);
                delete first.children
            }
            result.push(first)
        }

        return result;
    }

    findNodeById(id) {
        return this.flatternTree.find((node) => node.id === id)
    }
}

export {
    LayoutTree
}