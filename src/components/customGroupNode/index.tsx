import { NodeProps, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";

function CustomGroupNode(props: NodeProps) {
  const { data } = props;
  return (
    <CustomNodeWrapper
      {...props}
      addonBtns={[Position.Bottom]}
    >
      <div className="customGroupNode">{data.label}</div>
    </CustomNodeWrapper>
  );
}

export default CustomGroupNode;
