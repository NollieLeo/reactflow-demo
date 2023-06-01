import { FC } from "react";
import {
  EdgeProps,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from "reactflow";
import "./index.scss";
import Success from "@/assets/success.svg";

const SuccessEdge: FC<EdgeProps> = (props) => {
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
    borderRadius: 16,
  });

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
          className="successEdge"
          style={{
            position: "absolute",
            transform: `translate(-50%, -100%) translate(${targetX}px,${targetY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
            paddingBottom: "10px",
          }}
        >
          <img src={Success} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default SuccessEdge;
