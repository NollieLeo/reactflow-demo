import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";

function CustomEndNode(props) {
  const { isConnectable } = props;
  return (
    <CustomNodeWrapper className="customEndNode">
      <span>结束</span>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
    </CustomNodeWrapper>
  );
}

export default CustomEndNode;
