import { NodeProps, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";

function CustomEndNode(props: NodeProps) {
  return (
    <CustomNodeWrapper
      {...props}
      handles={[Position.Top]}
      addonBtns={[]}
      className="customEndNode"
    >
      <span>结束</span>
    </CustomNodeWrapper>
  );
}

export default CustomEndNode;
