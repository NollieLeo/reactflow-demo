import { NodeProps, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";

function CustomStartNode(props: NodeProps) {
  return (
    <CustomNodeWrapper
      {...props}
      handles={[Position.Bottom]}
      addonBtns={[Position.Bottom]}
    >
      <div className="customStartNode">开始节点</div>
    </CustomNodeWrapper>
  );
}

export default CustomStartNode;
