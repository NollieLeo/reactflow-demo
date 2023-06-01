import { FC } from "react";
import {
  EdgeProps,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from "reactflow";
import "./index.scss";

const CustomButtonEdge: FC<EdgeProps> = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  } = props;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
  });

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
  };

  return (
    <>
      <BaseEdge
        style={{
          ...style,
          stroke: "#505050",
        }}
        path={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div className="addBtn" onClick={(event) => onEdgeClick(event, id)}>
            +
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomButtonEdge;
