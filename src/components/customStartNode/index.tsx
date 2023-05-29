import { NodeProps, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";

function CustomStartNode(props: NodeProps) {
  return (
    <CustomNodeWrapper
      {...props}
      className="customStartNode"
      handles={[Position.Bottom]}
      addonBtns={[Position.Bottom]}
    >
      <div>开始节点</div>
    </CustomNodeWrapper>
  );
}

export default CustomStartNode;
