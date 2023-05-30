import CustomNodeWrapper from "../customNodeWrapper";
import { NodeProps, Position } from "reactflow";
import "./index.scss";

const CustomEmptyNode = (props: NodeProps) => {
  return (
    <CustomNodeWrapper
      {...props}
      handles={[Position.Top]}
      className="CustomEmptyNode"
    >
      <div></div>
    </CustomNodeWrapper>
  );
};

export default CustomEmptyNode;
