import getLayoutedElements from "../../utils/getLayoutElements";

type UseLayoutedElementsProps = Parameters<typeof getLayoutedElements>

function useLayoutedElements(props: UseLayoutedElementsProps) {
    const [initialNodes, initialEdges] = props;
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
    );

    return [layoutedNodes, layoutedEdges]
}

export default useLayoutedElements